import type { Metadata } from "next";
import Link from "next/link";
import { Download, Headset, Mail, Phone } from "lucide-react";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { Button } from "@/components/ui/button";
import { allFaqs, faqGroups } from "@/lib/content/faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about our hybrid, laminate and timber flooring, professional installation, warranties and ongoing care.",
  alternates: { canonical: "/faq" },
};

/** Structured data so the answers can surface directly in search results. */
function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
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

function SupportCard() {
  return (
    <div
      id="faq-support"
      className="flex scroll-mt-28 flex-col gap-4 rounded-2xl bg-surface-highest/60 p-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-headline-md text-primary">Still have questions?</h2>
        <p className="text-body-md text-muted-foreground">
          Our flooring experts are available to provide detailed advice for your
          specific project.
        </p>
      </div>

      <a
        href={siteConfig.contact.phoneHref}
        className="flex min-h-11 items-center gap-3 text-body-md text-primary transition-colors hover:text-secondary"
      >
        <Phone className="size-5 shrink-0 text-secondary" aria-hidden="true" />
        {siteConfig.contact.phone}
      </a>
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="flex min-h-11 items-center gap-3 text-body-md text-primary transition-colors hover:text-secondary"
      >
        <Mail className="size-5 shrink-0 text-secondary" aria-hidden="true" />
        Email Support
      </a>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />

      <FaqBrowser groups={faqGroups} support={<SupportCard />} />

      {/* Full-bleed dark band, as in the mockup */}
      {/* primary-container, not primary — see the note on the contact page. */}
      <section className="bg-ink-soft py-section">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            Didn&rsquo;t find what you were looking for?
          </h2>
          <p className="max-w-2xl text-pretty text-body-lg text-ink-muted">
            Our dedicated support team is ready to assist you with any technical
            or aesthetic queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <Link href="/contact?enquiry=consultation">
                <Headset aria-hidden="true" />
                Talk to a Consultant
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/contact?enquiry=samples">
                <Download aria-hidden="true" />
                Request a Care Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
