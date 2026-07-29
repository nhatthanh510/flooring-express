import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/lib/client";

/**
 * Wires the client to Sanity's Live Content API.
 *
 * Deliberately the non-`strict` form: `strict: true` is the Cache Components
 * variant, which requires `cacheComponents: true` in next.config and moves every
 * query inside a `'use cache'` boundary. This project stays on the fetch Data
 * Cache — it persists across deploys and serverless instances, which the
 * in-memory `'use cache'` default does not.
 *
 * Under the hood `sanityFetch` issues `client.fetch(..., { next: { revalidate:
 * false, tags } })` and tags each response with the documents it touched, so
 * `<SanityLive />` can revalidate exactly the affected pages when content
 * changes. It also resolves draft mode and stega per request on its own.
 *
 * The read token is Viewer-only by design: `<SanityLive />` hands `browserToken`
 * to the client when draft mode is on, so it must never be able to write.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
