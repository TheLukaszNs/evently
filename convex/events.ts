import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .collect();
  },
});

export const get = query({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

export const createEvent = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return ctx.db.insert("events", {
      name: args.name,
      userId: user._id,
    });
  },
});

export const deleteEvent = mutation({
  args: {
    id: v.id("events"),
  },
  handler: async (ctx, args) => {
    return ctx.db.delete(args.id);
  },
});
