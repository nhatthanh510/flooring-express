import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/shared/page-hero";
import { siteConfig } from "@/lib/site-config";
import {
  enquiryCopy,
  isEnquiryType,
  isFlooringInterest,
} from "@/lib/schemas/quote";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Expert flooring advice and premium installation services across Hobart. Request a free quote and we'll respond within 24 hours.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ enquiry?: string; flooring?: string }>;
}) {
  // CTAs across the site deep-link here with their intent, so the form arrives
  // pre-set to what the visitor actually clicked rather than a generic quote.
  const { enquiry, flooring } = await searchParams;
  const enquiryType = isEnquiryType(enquiry) ? enquiry : "quote";
  const flooringType = isFlooringInterest(flooring) ? flooring : "hybrid";
  const copy = enquiryCopy[enquiryType];

  return (
    <>
      <PageHero
        title="Contact Our Flooring Specialists"
        description="Expert advice and premium installation services across Hobart. Let's transform your space together."
        image={{
          src: "/images/contact/hero.webp",
          alt: "Newly laid flooring in a bright Hobart interior, ready for handover.",
        }}
        scrim="left"
        height="min-h-[340px] md:min-h-[409px]"
      />

      <section className="container-page py-section">
        {/* Contact details lead in the DOM so they come first on mobile, as in
            the mockup; `lg:order-*` swaps the columns on desktop. The group's
            sr-only h2 keeps the heading order valid (h1 → h2 → h3 → h2). */}
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          <div className="lg:order-1 lg:col-span-5">
            <h2 className="sr-only">Contact details</h2>
            <ContactInfoCards />
          </div>
          <div className="lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full bg-secondary/5"
              />
              <div className="relative">
                <h2 className="text-headline-lg text-primary">
                  {copy.heading}
                </h2>
                <p className="mt-3 text-body-md text-muted-foreground">
                  {copy.description}
                </p>

                <QuoteForm
                  idPrefix="contact-quote"
                  defaultEnquiry={enquiryType}
                  defaultFlooring={flooringType}
                  showEnquiryType
                  className="mt-8"
                />

                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="flex -space-x-3">
                    {[
                      {
                        src: "/images/contact/avatar-consultant.webp",
                        alt: "Flooring Express consultant",
                      },
                      {
                        src: "/images/contact/avatar-designer.webp",
                        alt: "Flooring Express interior designer",
                      },
                    ].map((avatar) => (
                      <span
                        key={avatar.src}
                        className="relative size-10 overflow-hidden rounded-full border-2 border-card"
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                    ))}
                  </div>
                  <p className="text-body-md text-muted-foreground">
                    Join{" "}
                    <strong className="font-semibold text-primary">
                      {siteConfig.stats.familiesServed} Hobart families
                    </strong>{" "}
                    who upgraded their floors this year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-section">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            Have a quick question?
          </h2>
          <p className="max-w-2xl text-pretty text-body-lg text-ink-muted">
            Browse our frequently asked questions about installation times,
            material durability, and our Hobart service range.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <Link href="/faq">View FAQ</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <a href={siteConfig.contact.phoneHref}>Call Support</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
