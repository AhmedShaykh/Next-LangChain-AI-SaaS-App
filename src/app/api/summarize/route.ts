import { NextRequest, NextResponse } from "next/server";
import { coinsSpend, minusCoins, updateSummary } from "@/actions/commonActions";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getUserCoins } from "@/actions/fetchActions";
import { summaryTemplate } from "@/lib/prompts";
import { groqModel } from "@/lib/langchain";
import prisma from "@/lib/db";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { TokenTextSplitter } from "langchain/text_splitter";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { getServerSession } from "next-auth";

interface SummarizePayload {
    url: string;
    id: string;
};

export async function POST(req: NextRequest) {

    try {

        const session: CustomSession | null = await getServerSession(authOptions);

        if (!session?.user?.id) {

            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        }

        const body: SummarizePayload = await req.json();

        if (!body.url || !body.id) {

            return NextResponse.json({ message: "Missing url or id" }, { status: 400 });

        }

        const userCoins = await getUserCoins(session.user.id);

        if (userCoins === null || (userCoins?.coins ?? 0) < 10) {

            return NextResponse.json(
                { message: "You don't have sufficient coins (need 10). Please add coins." },
                { status: 400 }
            );

        }

        const oldSummary = await prisma.summary.findFirst({
            select: { response: true },
            where: { url: body.url }
        });

        if (oldSummary?.response) {

            await minusCoins(session.user.id);

            await coinsSpend(session.user.id, body.id);

            return NextResponse.json({
                message: "Podcast video Summary (from cache)",
                data: oldSummary.response
            });

        }

        let docs: Document[];

        try {

            const loader = YoutubeLoader.createFromUrl(body.url, {
                language: "en",
                addVideoInfo: true
            });

            docs = await loader.load();

        } catch (loadErr) {

            console.error("Youtube transcript load failed:", loadErr);

            return NextResponse.json(
                { message: "No transcript available for this video. Try another." },
                { status: 404 }
            );

        }

        if (docs.length === 0 || !docs[0].pageContent.trim()) {

            return NextResponse.json(
                { message: "Empty transcript. Video may not have captions." },
                { status: 404 }
            );

        }

        const splitter = new TokenTextSplitter({
            chunkSize: 15000,
            chunkOverlap: 250
        });

        const splitDocs = await splitter.splitDocuments(docs);

        const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);

        const summaryChain = loadSummarizationChain(groqModel, {
            type: "map_reduce",
            verbose: process.env.NODE_ENV === "development",
            combinePrompt: summaryPrompt
        });

        const res = await summaryChain.invoke({ input_documents: splitDocs });

        const summaryText = res?.text?.trim() || "Summary generation failed.";

        await minusCoins(session.user.id);

        await coinsSpend(session.user.id, body.id);

        await updateSummary(body.id, summaryText);

        return NextResponse.json({
            message: "Podcast video Summary generated",
            data: summaryText
        });

    } catch (error) {

        console.error("Summarize API error:", error);

        return NextResponse.json(
            { message: "Something went wrong. Please try again later." },
            { status: 500 }
        );

    }

};