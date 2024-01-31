import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values"

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        isPublished: v.boolean()
    })
    .index("by_user", ["userId"]),
      
    prompt: defineTable({
        // choices: v.array(v.object({
        //     finish_reason: v.string(),
        //     index: v.number(),
        //     message: v.object({
        //         content: v.string(),
        //         role: v.string()
        //     }),
        //     logprobs: v.optional(v.any()),
        // })),
        //     created: v.number(),
        // id: v.string(),
        // model: v.string(),
        // object: v.string(),
        // usage: v.optional(v.object({
        //     completion_tokens: v.optional(v.number()),
        //     prompt_tokens: v.optional(v.number()),
        //     total_tokens: v.optional(v.number())
        // })),
        content: v.string(),
        role: v.string(),
        documentId: v.id("documents")
    })    .index("by_document", ["documentId"])
    ,

})