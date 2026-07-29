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
  useCdn: true,
  perspective: "published",
  stega: { studioUrl },
});
