import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
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
 * Authenticated by the webhook's **Secret field**, not a secret in the URL:
 * Sanity HMAC-signs each delivery and sends the signature as a header, so the
 * secret itself never appears in URLs, logs or the webhook dashboard, and the
 * signature also proves the payload wasn't tampered with in transit.
 *
 * Revalidates the whole route tree rather than mapping documents to paths:
 * the site is a couple of dozen pages, shared content (site settings, the
 * header CTA) touches all of them anyway, and a wrong mapping here would
 * recreate the original bug for whichever page it missed.
 *
 * Configure: sanity.io/manage → API → Webhooks → URL
 * `https://<site>/api/revalidate`, dataset `production`, trigger on
 * create + update + delete, and paste SANITY_REVALIDATE_SECRET into the
 * form's Secret field. Leave "Drafts" and "Versions" unticked — draft
 * edits must not purge the published site's cache.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  // The signature covers the raw bytes — read them before any parsing.
  const body = await request.text();

  const authorized =
    !!secret && !!signature && (await isValidSignature(body, signature, secret));

  if (!authorized) {
    // Unconfigured or wrong secret — refuse loudly in the logs, quietly to the
    // caller.
    console.error("[revalidate] rejected: missing or invalid signature.");
    return Response.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
