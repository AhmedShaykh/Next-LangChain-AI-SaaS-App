import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { getSummary, getUserCoins } from "@/actions/fetchActions";
import SummaryBase from "@/Components/SummaryBase";
import Header from "@/Components/Header";
import notFound from "@/app/not-found";
import { getServerSession } from "next-auth";

const Summarize = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    if (!searchParams?.["id"]) {

        return notFound();

    }

    const summary = await getSummary(searchParams?.["id"]);

    if (!summary) {

        return notFound();

    }

    const session: CustomSession | null = await getServerSession(authOptions);

    const userCoins = await getUserCoins(session?.user?.id!);

    return (
        <div className="container px-6">
            <Header user={session?.user!} userCoins={userCoins} />
            <SummaryBase summary={summary} />
        </div>
    )
};

export default Summarize;