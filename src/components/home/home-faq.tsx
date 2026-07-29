import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { SanityFillImage } from "@/components/shared/sanity-image";
import type {
  HOME_FAQS_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
} from "@/sanity/types";

export function HomeFaq({
  section,
  faqs,
}: {
  section: NonNullable<HOME_PAGE_QUERY_RESULT>["faqSection"];
  faqs: HOME_FAQS_QUERY_RESULT;
}) {
  return (
    <section id="faq" className="scroll-mt-24 py-section">
      {/* Split header — copy on the left, plank detail on the right */}
      <div className="container-page mb-16 grid items-center gap-gutter md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="text-label-sm uppercase tracking-widest text-secondary">
            {section?.heading?.eyebrow}
          </span>
          <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
            {section?.heading?.title}
          </h2>
          <p className="max-w-md text-pretty text-body-lg text-muted-foreground">
            {section?.heading?.description}
          </p>
        </div>

        <div className="relative h-64 overflow-hidden rounded-xl shadow-ambient md:h-96">
          <SanityFillImage
            image={section?.image}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <FaqAccordion items={faqs} idPrefix="home-faq" variant="divided" />

          {section?.link && (
            <p className="mt-10 text-center">
              <Link
                href={section.link.href ?? "/faq"}
                className="inline-flex min-h-11 items-center gap-2 text-body-md font-semibold text-secondary transition-[gap] hover:gap-3"
              >
                {section.link.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
