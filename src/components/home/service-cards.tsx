import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/lib/content/services";

export function ServiceCards() {
  return (
    <section id="services" className="container-page scroll-mt-24 py-section">
      <SectionHeading
        eyebrow="Our Expertise"
        title="Tailored Flooring Options"
        description="Three surfaces, one standard of installation. Every floor is measured, prepared and laid by our own certified Hobart team."
      />

      <div className="mt-16 grid gap-gutter md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} delay={index * 100}>
              <article className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-ambient transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-ambient-lifted">
                <span className="flex size-14 items-center justify-center rounded-xl bg-cream text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="text-headline-md text-primary">
                  {service.name}
                </h3>
                <p className="text-body-md text-muted-foreground">
                  {service.homeBlurb}
                </p>

                <ul className="flex flex-col gap-3">
                  {service.homeFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-body-md text-primary"
                    >
                      <CircleCheck
                        className="size-5 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services#${service.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-2 text-label-md font-semibold text-secondary transition-[gap] hover:gap-3"
                >
                  Request Sample
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
