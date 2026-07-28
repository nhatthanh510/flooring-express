import type { Metadata } from "next";
import Image from "next/image";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/shared/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Expert flooring advice and premium installation services across Hobart. Request a free quote and we'll respond within 24 hours.",
};

export default function ContactPage() {
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
        {/* The form leads in the DOM so it comes first on mobile and so the
            heading order stays h1 → h2 → h3; `lg:order-*` moves it right on
            desktop to match the mockup. */}
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          <div className="lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full bg-secondary/5"
              />
              <div className="relative">
                <h2 className="text-headline-lg text-primary">
                  Request a Free Quote
                </h2>
                <p className="mt-3 text-body-md text-muted-foreground">
                  Fill out the form below and one of our experts will get back
                  to you within 24 hours with a detailed estimate.
                </p>

                <QuoteForm idPrefix="contact-quote" className="mt-8" />

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

          <div className="lg:order-1 lg:col-span-5">
            <ContactInfoCards />
          </div>
        </div>
      </section>
    </>
  );
}
