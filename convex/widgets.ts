import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    eventId: v.id("events"),
    type: v.union(
      v.literal("organizers"),
      v.literal("comments"),
      v.literal("location"),
    ),
    config: v.string(),
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

    return ctx.db.insert("widgets", {
      ...args,
      userId: user._id,
    });
  },
});

export const list = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("widgets")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});
