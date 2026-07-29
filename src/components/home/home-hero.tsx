import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SanityFillImage } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

type Hero = NonNullable<HOME_PAGE_QUERY_RESULT>["hero"];

export function HomeHero({ hero }: { hero: Hero }) {
  const [primary, secondary] = hero?.actions ?? [];

  return (
    <section className="relative flex min-h-[751px] items-center md:min-h-[720px]">
      <SanityFillImage image={hero?.image} priority sizes="100vw" />
      {/* Even scrim on mobile, where the copy is centred over the whole frame;
          a left-to-right gradient from md, where the copy sits on the left. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 md:bg-gradient-to-r md:from-black/70 md:via-black/45 md:to-black/20"
      />

      {/* Centred and stacked on mobile, left-aligned from md — per the mobile
          Stitch screen. */}
      <div className="container-page relative py-20 text-center md:text-left">
        <div className="flex max-w-2xl flex-col items-center gap-6 md:items-start">
          {hero?.eyebrow && (
            <span className="rounded-full bg-secondary px-4 py-1.5 text-label-sm uppercase text-secondary-foreground">
              {hero.eyebrow}
            </span>
          )}
          <h1 className="text-balance text-headline-lg-mobile text-white md:text-display-lg">
            {hero?.title}
          </h1>
          <p className="text-pretty text-body-lg text-white/90">
            {hero?.description}
          </p>
          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            {primary && (
              <Button asChild size="xl" variant="secondary">
                <Link href={primary.href ?? "#"}>
                  {primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-2 border-white bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                <Link href={secondary.href ?? "#"}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
