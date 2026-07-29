import { Reveal } from "@/components/shared/reveal";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ABOUT_PAGE_QUERY_RESULT } from "@/sanity/types";

type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;

export function CraftsmanshipGrid({ cards }: { cards: AboutPage["craftCards"] }) {
  return (
    <section className="container-page py-section">
      <SectionHeading title="Craftsmanship in Action" />

      <div className="mt-16 grid gap-gutter md:grid-cols-2 lg:grid-cols-4">
        {cards?.map((card, index) => (
          <Reveal key={card.title} delay={index * 80}>
            <article className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-3 shadow-ambient">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <SanityFillImage
                  image={card.image}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="transition-transform duration-500 group-hover:scale-105"
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
