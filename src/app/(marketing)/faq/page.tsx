import type { Metadata } from "next";
import Link from "next/link";
import { Download, Headset, Mail, Phone } from "lucide-react";

import { FaqBrowser } from "@/components/faq/faq-browser";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ALL_FAQS_QUERY,
  FAQ_GROUPS_QUERY,
  FAQ_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";
import type {
  ALL_FAQS_QUERY_RESULT,
  FAQ_PAGE_QUERY_RESULT,
} from "@/sanity/types";
import type { SiteSettings } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: FAQ_PAGE_QUERY, stega: false });
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: { canonical: "/faq" },
  };
}

/** Structured data so the answers can surface directly in search results. */
function FaqJsonLd({ faqs }: { faqs: ALL_FAQS_QUERY_RESULT }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function SupportCard({
  card,
  contact,
}: {
  card: NonNullable<FAQ_PAGE_QUERY_RESULT>["supportCard"];
  contact: SiteSettings["contact"];
}) {
  return (
    <div
      id="faq-support"
      className="flex scroll-mt-28 flex-col gap-4 rounded-2xl bg-surface-highest/60 p-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-headline-md text-primary">{card?.title}</h2>
        <p className="text-body-md text-muted-foreground">
          {card?.description}
        </p>
      </div>

      <a
        href={contact?.phoneHref ?? undefined}
        className="flex min-h-11 items-center gap-3 text-body-md text-primary transition-colors hover:text-secondary"
      >
        <Phone className="size-5 shrink-0 text-secondary" aria-hidden="true" />
        {contact?.phone}
      </a>
      <a
        href={`mailto:${contact?.email ?? ""}`}
        className="flex min-h-11 items-center gap-3 text-body-md text-primary transition-colors hover:text-secondary"
      >
        <Mail className="size-5 shrink-0 text-secondary" aria-hidden="true" />
        {card?.emailLabel}
      </a>
    </div>
  );
}

export default async function FaqPage() {
  const [{ data: page }, { data: groups }, { data: allFaqs }, { data: settings }] =
    await Promise.all([
      sanityFetch({ query: FAQ_PAGE_QUERY }),
      sanityFetch({ query: FAQ_GROUPS_QUERY }),
      sanityFetch({ query: ALL_FAQS_QUERY }),
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
    ]);

  if (!page || !settings) return null;
  const [primary, secondary] = page.closingBand?.actions ?? [];

  return (
    <>
      <FaqJsonLd faqs={allFaqs} />

      <FaqBrowser
        groups={groups}
        hero={page.hero}
        heroImage={page.hero?.image}
        searchPlaceholder={page.searchPlaceholder ?? ""}
        support={
          <SupportCard card={page.supportCard} contact={settings.contact} />
        }
      />

      {/* Full-bleed dark band, as in the mockup */}
      {/* primary-container, not primary — see the note on the contact page. */}
      <section className="bg-ink-soft py-section">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            {page.closingBand?.title}
          </h2>
          <p className="max-w-2xl text-pretty text-body-lg text-ink-muted">
            {page.closingBand?.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {primary && (
              <Button asChild size="xl" variant="secondary">
                <Link href={primary.href ?? "#"}>
                  <Headset aria-hidden="true" />
                  {primary.label}
                </Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link href={secondary.href ?? "#"}>
                  <Download aria-hidden="true" />
                  {secondary.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
