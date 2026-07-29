import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/sanity/lib/client";

/**
 * Turns on Next's draft mode for a Presentation-tool preview.
 *
 * `defineEnableDraftMode` validates a single-use secret minted by the Studio
 * before setting the cookie, so the URL can't simply be shared to expose
 * unpublished content. The token is Viewer-only.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
