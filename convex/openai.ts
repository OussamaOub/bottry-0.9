import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { api } from "./_generated/api";
import OpenAI from "openai";

        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string;
if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_OPENAI_API_KEY");
}
const openai = new OpenAI({ apiKey });

export const getAIModels = action({
    handler: async(ctx) =>{
        const models = await openai.models.list();
        return models.data;
    }
})


export const chat = action({
    args:{
        documentId: v.id("documents"),
        newMsg: v.string(),
        params: v.object({
            model: v.string(),
            max_tokens: v.number(),
            frequency_penalty: v.number(),
            presence_penalty: v.number(),
            temperature: v.number(),
            n: v.number(),
        })      
    },
    handler: async(ctx, args) =>{
            const messages = await ctx.runQuery(api.chat.getPromptsByDocumentId, {documentId: args.documentId});
          
            // Grab the API key from environment variables
            // Specify this in your dashboard: `npx convex dashboard`
          
            const instructions = "Your role is to answer this question only: {'What is a cat'}. Answer however you see fit, but don't answer any other questions. If you can't answer a question, you must respond with, {'naaaah'}"; // Replace with actual instructions
            const openaiResponse = await openai.chat.completions.create({
                model: args.params.model,
                max_tokens: args.params.max_tokens,
                frequency_penalty: args.params.frequency_penalty,
                presence_penalty: args.params.presence_penalty,
                temperature: args.params.temperature,
                n: args.params.n,
                messages:[
                    {role: "system", content: instructions},
                    ...messages.map((message: any) => ({
                        role: message.role,
                        content: message.content,
                      })),
                        {role: "user", content: args.newMsg}
                                ]
            });
          
            if (!openaiResponse) {
              throw new Error("OpenAI error: " + openaiResponse);
            }
          
            const responseBody = openaiResponse.choices[0].message;
            const prompt = await ctx.runMutation(api.chat.createPrompt,{documentId: args.documentId, content: responseBody.content as string, role: responseBody.role})
    }
})