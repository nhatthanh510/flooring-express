import Image from "next/image";
import { BadgeCheck, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const points = [
  {
    icon: BadgeCheck,
    title: "Premium Materials",
    description:
      "We source only the highest grade planks from industry-leading manufacturers.",
  },
  {
    icon: MapPin,
    title: "Hobart Specialists",
    description:
      "Locally based team understanding Tasmanian climate and architectural needs.",
  },
];

export function QualityBand() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-ink-soft py-section text-primary-foreground"
    >
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/images/home/quality-installers.webp"
              alt="Flooring Express installers fitting a plank floor in a Hobart home."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden flex-col items-center rounded-2xl bg-secondary px-8 py-6 text-secondary-foreground shadow-ambient-lifted md:flex">
            <span className="font-display text-display-lg leading-none">
              {siteConfig.stats.yearsExperience}
            </span>
            <span className="mt-1 text-label-sm uppercase">
              Years of Excellence
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            Expertise You Can Trust. Local Quality You Can Feel.
          </h2>
          <p className="text-pretty text-body-lg text-ink-muted">
            As a locally owned Hobart business, Flooring Express is dedicated to
            elevating Tasmanian homes with superior surfaces. We don’t just sell
            floors; we provide a complete installation experience backed by
            expert consultants and certified installers.
          </p>

          <ul className="mt-2 flex flex-col gap-6">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="size-5 text-cream" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-headline-md text-primary-foreground">
                      {point.title}
                    </h3>
                    <p className="text-body-md text-ink-muted">
                      {point.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
