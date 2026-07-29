import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundContent } from "@/components/shared/not-found-content";
import { sanityFetch } from "@/sanity/lib/live";
import { NOT_FOUND_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

/**
 * The app's only 404, covering both cases Next.js routes here:
 *
 *  - unmatched URLs anywhere in the app (a mistyped or stale link), and
 *  - explicit `notFound()` calls, which today means an unknown case-study slug
 *    in `(marketing)/gallery/[slug]/page.tsx`.
 *
 * A segment-level `(marketing)/not-found.tsx` would inherit the header and
 * footer for free, but only for the second case — the first renders against the
 * root layout no matter what, so it would still need this file and the chrome
 * would appear on one 404 and not the other. Fetching settings here instead
 * gives both paths the same page, and keeps it to one file to maintain.
 *
 * Both fetches are deliberately non-fatal. A 404 that throws while explaining a
 * 404 is the worst version of this page, so a failed lookup degrades to the bare
 * message rather than escalating to `app/error.tsx`.
 */
async function fetchPage() {
  try {
    const [{ data: settings }, { data: page }] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false }),
      sanityFetch({ query: NOT_FOUND_PAGE_QUERY, stega: false }),
    ]);
    return { settings, page };
  } catch {
    return { settings: null, page: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await fetchPage();
  return {
    title: page?.seo?.metaTitle ?? "Page not found",
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function NotFound() {
  const { settings, page } = await fetchPage();

  return (
    <>
      {settings && (
        <SiteHeader
          name={settings.name ?? ""}
          navItems={settings.navItems ?? []}
        />
      )}

      <NotFoundContent page={page} />

      {settings && <SiteFooter settings={settings} />}
    </>
  );
}
