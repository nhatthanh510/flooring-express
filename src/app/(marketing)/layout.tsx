import { draftMode } from "next/headers";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DraftModeBanner } from "@/components/shared/draft-mode-banner";
import { LocalBusinessJsonLd } from "@/components/shared/local-business-jsonld";
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // One round trip each, both tagged — <SanityLive /> revalidates just the
  // pages that touched a document when it changes.
  const [{ data: settings }, { data: services }, { isEnabled: isDraft }] =
    await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
      sanityFetch({ query: SERVICES_QUERY }),
      draftMode(),
    ]);

  if (!settings) {
    throw new Error(
      "No siteSettings document found. Run `pnpm migrate:sanity` to seed the dataset.",
    );
  }

  return (
    <>
      <LocalBusinessJsonLd settings={settings} services={services} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader
        name={settings.name ?? ""}
        navItems={settings.navItems ?? []}
        headerCta={settings.headerCta}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter settings={settings} />

      {isDraft && <DraftModeBanner />}
      <SanityLive />
    </>
  );
}
