import { ChatOpenAI } from "@langchain/openai";

export const groqModel = new ChatOpenAI({
    openAIApiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    streaming: true,
    maxTokens: 8192,
    configuration: {
        baseURL: "https://api.groq.com/openai/v1"
    }
});