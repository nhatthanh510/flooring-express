import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

/**
 * Cache purge for Sanity's publish webhook.
 *
 * Needed because `<SanityLive />` only revalidates through browsers that are
 * on the site when the publish event fires — pages cache with
 * `revalidate: false`, so an edit published while nobody is browsing stays
 * invisible for good. (Exactly what happened the day this was added: the
 * owner's edits showed in preview, but the public site never changed.) A
 * webhook from Sanity does not depend on anyone having a tab open.
 *
 * Revalidates the whole route tree rather than mapping documents to paths:
 * the site is a couple of dozen pages, shared content (site settings, the
 * header CTA) touches all of them anyway, and a wrong mapping here would
 * recreate the original bug for whichever page it missed.
 *
 * Configure: sanity.io/manage → API → Webhooks → URL
 * `https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`, dataset
 * `production`, trigger on create + update + delete.
 */
export async function POST(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret") ?? "";

  const authorized =
    !!expected &&
    expected.length === given.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(given));

  if (!authorized) {
    // Unconfigured or wrong secret — refuse loudly in the logs, quietly to the
    // caller.
    console.error("[revalidate] rejected: bad or missing secret.");
    return Response.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
