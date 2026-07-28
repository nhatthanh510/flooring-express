import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[620px] items-center md:min-h-[720px]">
      <Image
        src="/images/home/hero.webp"
        alt="Sunlit open-plan Hobart living room finished in wide-plank timber flooring."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20"
      />

      <div className="container-page relative py-20">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <span className="rounded-full bg-accent px-4 py-1.5 text-label-sm uppercase text-accent-foreground">
            Expert Hobart Installers
          </span>
          <h1 className="text-balance text-[40px] font-bold leading-tight text-white md:text-display-lg">
            Premium Flooring Solutions for Hobart Homes
          </h1>
          <p className="text-pretty text-body-lg text-white/85">
            Specializing in Hybrid, Laminate, and Timber installation with a
            focus on quality craftsmanship and long-lasting stability.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <Link href="#contact">Request a Free Quote</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
            >
              <Link href="#services">Explore Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
