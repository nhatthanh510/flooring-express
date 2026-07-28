import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { Button } from "@/components/ui/button";
import { allFaqs, faqGroups } from "@/lib/content/faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about our hybrid, laminate and timber flooring, professional installation, warranties and ongoing care.",
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

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />

      <section className="container-page py-16 text-center md:py-24">
        <h1 className="text-headline-lg-mobile text-primary md:text-display-lg">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground">
          Find answers to common questions about our premium flooring solutions,
          professional installation, and ongoing care.
        </p>
      </section>

      <section className="container-page pb-section">
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FaqBrowser groups={faqGroups} />
          </div>

          <aside
            id="faq-support"
            className="scroll-mt-28 lg:col-span-4 lg:sticky lg:top-28"
          >
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface-low p-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-headline-md text-primary">
                  Still have questions?
                </h2>
                <p className="text-body-md text-muted-foreground">
                  Our flooring experts are available to provide detailed advice
                  for your specific project.
                </p>
              </div>

              <Button asChild size="xl" className="w-full">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full">
                <a href={`mailto:${siteConfig.contact.email}`}>
                  <Mail aria-hidden="true" />
                  Email Support
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page pb-section">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary p-10 text-center md:p-16">
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
                Talk to a Consultant
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/contact?enquiry=samples">Request a Care Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
