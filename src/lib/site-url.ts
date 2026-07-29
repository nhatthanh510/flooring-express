/**
 * Where the site is being served from.
 *
 * This is the one piece of "site config" that stays in code rather than moving
 * to Sanity: it has to vary per deploy — production, a Vercel preview, a local
 * tunnel — and a value typed into a CMS would silently break the absolute
 * `og:image` URL on every build that isn't production.
 */

/** The domain the site will eventually live on. */
export const PRODUCTION_URL = "https://flooringexpress.com.au";

/**
 * Absolute base URL used for `metadataBase`, canonical links, the sitemap and —
 * critically — the `og:image` URL.
 *
 * Social crawlers fetch `og:image` as an absolute URL, so if this points at a
 * domain that isn't serving the site, the preview falls back to title and
 * description with no image. Resolution order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — set this for a tunnel (ngrok/cloudflared) or any
 *      non-Vercel host.
 *   2. Vercel's production/preview URL, so preview deployments preview correctly.
 *   3. The production domain above.
 *
 * In `next dev` it falls back to localhost, which is fine for looking at the
 * card yourself but can never work in a real share — crawlers can't reach your
 * machine. Use a tunnel plus `NEXT_PUBLIC_SITE_URL` to test that properly.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return PRODUCTION_URL;
}

export const siteUrl = resolveSiteUrl();
