import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeFaqs } from "@/lib/content/faqs";

export function HomeFaq() {
  return (
    <section id="faq" className="container-page scroll-mt-24 py-section">
      <SectionHeading
        eyebrow="Expert Guidance"
        title="Frequently Asked Questions"
        description="Everything you need to know about our premium flooring solutions, installation process, and long-term warranties."
        rule={false}
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <FaqAccordion items={homeFaqs} idPrefix="home-faq" />

        <p className="mt-8 text-center text-body-md text-muted-foreground">
          <Link
            href="/faq"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-secondary transition-[gap] hover:gap-3"
          >
            See all questions
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
