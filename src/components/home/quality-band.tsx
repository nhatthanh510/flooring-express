import { SanityFillImage } from "@/components/shared/sanity-image";
import { resolveIcon } from "@/lib/icons";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

export function QualityBand({
  band,
  yearsExperience,
}: {
  band: NonNullable<HOME_PAGE_QUERY_RESULT>["qualityBand"];
  yearsExperience: string;
}) {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-ink-soft py-section text-primary-foreground"
    >
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <SanityFillImage
              image={band?.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden flex-col items-center rounded-2xl bg-secondary px-8 py-6 text-secondary-foreground shadow-ambient-lifted md:flex">
            <span className="font-display text-display-lg leading-none">
              {yearsExperience}
            </span>
            <span className="mt-1 text-label-sm uppercase">
              {band?.statLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            {band?.title}
          </h2>
          <p className="text-pretty text-body-lg text-ink-muted">
            {band?.description}
          </p>

          <ul className="mt-2 flex flex-col gap-6">
            {band?.points?.map((point) => {
              const Icon = resolveIcon(point.icon);
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
