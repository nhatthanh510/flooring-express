import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { homeFaqs } from "@/lib/content/faqs";

export function HomeFaq() {
  return (
    <section id="faq" className="scroll-mt-24 py-section">
      {/* Split header — copy on the left, plank detail on the right */}
      <div className="container-page mb-16 grid items-center gap-gutter md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="text-label-sm uppercase tracking-widest text-secondary">
            Expert Guidance
          </span>
          <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md text-pretty text-body-lg text-muted-foreground">
            Everything you need to know about our premium flooring solutions,
            installation process, and long-term warranties.
          </p>
        </div>

        <div className="relative h-64 overflow-hidden rounded-xl shadow-ambient md:h-96">
          <Image
            src="/images/faq/home-faq-planks.webp"
            alt="Close-up of oak timber flooring planks showing the grain and matte finish."
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <FaqAccordion
            items={homeFaqs}
            idPrefix="home-faq"
            variant="divided"
          />

          <p className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex min-h-11 items-center gap-2 text-body-md font-semibold text-secondary transition-[gap] hover:gap-3"
            >
              See all questions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
