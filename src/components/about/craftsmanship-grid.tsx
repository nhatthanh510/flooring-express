import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { craftCards } from "@/lib/content/about";

export function CraftsmanshipGrid() {
  return (
    <section className="container-page py-section">
      <SectionHeading
        title="Craftsmanship in Action"
        description="The details that decide whether a floor still looks right in fifteen years."
      />

      <div className="mt-16 grid gap-gutter md:grid-cols-2 lg:grid-cols-4">
        {craftCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 80}>
            <article className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-3 shadow-ambient">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 pt-0">
                <h3 className="text-headline-md text-primary">{card.title}</h3>
                <p className="text-body-md text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
