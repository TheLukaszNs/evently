import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  events: defineTable({
    name: v.string(),
    userId: v.id("users"),
  }),
  widgets: defineTable({
    name: v.string(),
    userId: v.id("users"),
    eventId: v.id("events"),
    type: v.union(
      v.literal("organizers"),
      v.literal("comments"),
      v.literal("location"),
    ),
    config: v.string(),
  }).index("by_event", ["eventId"]),
});
