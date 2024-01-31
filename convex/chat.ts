import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getPromptsByDocumentId = query({
  args:{
      documentId: v.id("documents")
  },
  handler: async(ctx, args) =>{
      const identity = await ctx.auth.getUserIdentity();

      if(!identity){
          throw new Error("Not Authenticated");
      }
      const userId = identity.subject;

      const prompts = await ctx.db.
      query("prompt").withIndex("by_document", (q) => 
          q
          .eq("documentId", args.documentId)
      )
      .order("asc")
      .collect()
      return prompts;
  }
})

export const createPrompt = mutation({
  args:{
        //   choices: v.array(v.object({
        //       finish_reason: v.string(),
        //       index: v.number(),
        //       message: v.object({
        //           content: v.string(),
        //           role: v.string()
        //       }),
        //       logprobs: v.optional(v.any()),
        //   })),
        //   created: v.number(),
        //   id: v.string(),
        //   model: v.string(),
        //   object: v.string(),
        //   usage: v.object({
        //       completion_tokens: v.number(),
        //       prompt_tokens: v.number(),
        //       total_tokens: v.number()
        //   }),
            content: v.string(),
            role: v.string(),
          documentId: v.id("documents")
  },
  handler: async(ctx, args) =>{
      const identity = await ctx.auth.getUserIdentity();

      if(!identity){
          throw new Error("Not Authenticated");
      }
      const messages = await ctx.db.insert("prompt", {
        //   choices: args.prompt.choices,
        //   created: args.prompt.created,
          documentId: args.documentId,
        //   id: args.prompt.id,
        //   model: args.prompt.model,
        //   object: args.prompt.object,
        //   usage: args.prompt.usage,
        content: args.content,
        role: args.role
      })
      return messages;
  }
})
