import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MissionStory() {
  return (
    <section className="bg-surface-lowest py-section">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full bg-accent px-4 py-1.5 text-label-sm uppercase text-accent-foreground">
            Our Mission
          </span>
          <h2 className="text-balance text-headline-lg text-primary md:text-display-lg">
            Transforming homes with floors that tell a story.
          </h2>
          <p className="text-pretty text-body-lg text-muted-foreground">
            At Flooring Express Hobart, we believe a floor is more than just a
            surface to walk on—it’s the foundation of your family’s
            daily life. Since our inception, our goal has been to provide
            Tasmanian homeowners with premium flooring solutions that combine
            aesthetic beauty with rugged durability.
          </p>
          <p className="text-pretty text-body-md text-muted-foreground">
            Our journey started 15 years ago with a single van and a passion for
            timber. Today, we are proud to be Hobart’s trusted experts in
            Hybrid, Laminate, and Timber installations, serving the greater
            Hobart area from Kingston to Glenorchy and beyond.
          </p>
          <Button asChild size="xl">
            <Link href="/contact">
              Meet The Team
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-secondary/10"
          />
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/about/team.webp"
              alt="The Flooring Express Hobart team on site during an installation."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
