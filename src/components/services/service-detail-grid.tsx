import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ViewSpecsButton } from "@/components/services/view-specs-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { services } from "@/lib/content/services";

export function ServiceDetailGrid() {
  return (
    <section id="services" className="container-page scroll-mt-24 py-section">
      <SectionHeading title="Our Flooring Solutions" />

      <div className="mt-16 grid gap-gutter md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} delay={index * 100}>
              <article
                id={service.slug}
                className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card card-lift"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-5 p-8">
                  <div className="flex items-center gap-3">
                    <Icon
                      className="size-6 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                    <h3 className="text-headline-md text-primary">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-body-md text-muted-foreground">
                    {service.servicesBlurb}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {service.servicesFeatures.map((feature) => (
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

                  <ViewSpecsButton slug={service.slug} name={service.name} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
