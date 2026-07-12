import {
  Layers,
  TreePine,
  Droplets,
  Grid3x3,
  Waves,
  Square,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { services } from "@/lib/site";

const iconByKey: Record<string, typeof Layers> = {
  carpet: Layers,
  hardwood: TreePine,
  hybrid: Droplets,
  laminate: Grid3x3,
  vinyl: Waves,
  tile: Square,
};

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading
        id="services-heading"
        eyebrow="The flooring we install"
        title="Every floor type, one expert team"
        intro="Whatever surface suits your home, we supply it and install it ourselves — so nothing falls through the cracks between showroom and site."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconByKey[service.key] ?? Layers;
          return (
            <Reveal key={service.key} delay={i * 60}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="mt-3 text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.blurb}</p>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
