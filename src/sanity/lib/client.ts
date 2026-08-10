import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

/**
 * The read-only client every server component queries through (indirectly, via
 * `sanityFetch` in ./live.ts).
 *
 * `stega` embeds invisible source metadata in returned strings so the
 * Presentation tool can draw click-to-edit overlays. It is enabled only when
 * draft mode is on — `defineLive` flips it per request, and `next-sanity`
 * strips it from published responses, so production HTML is unaffected.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /**
   * Deliberately NOT the API CDN. Query results are already cached on our side
   * — the Data Cache holds them until the Live Content API revalidates by tag —
   * so the CDN's per-query cache added nothing except a staleness window:
   * builds run shortly after a content change kept baking minutes-old results
   * into static pages (it bit this project three times in one day). Uncached
   * fetches are rare enough here that the direct API's extra latency is noise.
   */
  useCdn: false,
  perspective: "published",
  stega: { studioUrl },
});
