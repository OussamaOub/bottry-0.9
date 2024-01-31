import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createDocument = mutation({
    
  handler: async(ctx) =>{
      const identity = await ctx.auth.getUserIdentity();

      if(!identity){
          throw new Error("Not Authenticated");
      }
      const userId = identity.subject;

      const document = await ctx.db.insert("documents", {
        userId,
        isArchived: false,
        isPublished: false,
        title: "Untitled",
      })
      return document;
  }
})

export const getDocuments = query({
    handler: async(ctx) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not Authenticated");
        }

        const documents = await ctx.db.query("documents").withIndex("by_user", (q) =>
            q
            .eq("userId", identity.subject)
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .order("asc")
        .collect()
        return documents;
    }
})

export const getById = query({
    args:{
        id: v.id("documents"),
    },
    handler: async(ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity();

        const document = await ctx.db.get(args.id);

        if(!document){
            throw new Error("Document not found");
        }

        if (document.isPublished && !document.isArchived){
            return document;
        }

        if(!identity){
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject;

        if(document.userId !== userId){
            throw new Error("Not authorized");
        }

        return document;
    }
})

export const updateDocument = mutation({
    args:{
        id: v.id("documents"),
        title: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
        isArchived: v.optional(v.boolean()),
    },
    handler: async(ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not Authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db.get(args.id);

        if(!document){
            throw new Error("Document not found");
        }

        if(document.userId !== userId){
            throw new Error("Not authorized");
        }

        const updatedDocument = await ctx.db.patch(args.id, {
            title: args.title?? document.title,
            isPublished: args.isPublished?? document.isPublished,
            isArchived: args.isArchived?? document.isArchived,

        })

        return updatedDocument;
    }
})