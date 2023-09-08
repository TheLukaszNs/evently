import { ConvexHttpClient } from "convex/browser";

export const HTTPClient = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);
