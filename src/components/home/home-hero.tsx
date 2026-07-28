import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[751px] items-center md:min-h-[720px]">
      <Image
        src="/images/home/hero.webp"
        alt="Sunlit open-plan Hobart living room finished in wide-plank timber flooring."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
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
          <span className="rounded-full bg-secondary px-4 py-1.5 text-label-sm uppercase text-secondary-foreground">
            Hobart&rsquo;s Leading Installers
          </span>
          <h1 className="text-balance text-headline-lg-mobile text-white md:text-display-lg">
            Premium Flooring Solutions for Hobart Homes
          </h1>
          <p className="text-pretty text-body-lg text-white/90">
            Specializing in Hybrid, Laminate, and Timber installation with a
            focus on quality craftsmanship and long-lasting stability.
          </p>
          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="xl" variant="secondary">
              <Link href="#contact">
                Request a Free Quote
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-2 border-white bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            >
              <Link href="#services">Explore Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
