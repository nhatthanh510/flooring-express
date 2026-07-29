import { Reveal } from "@/components/shared/reveal";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ABOUT_PAGE_QUERY_RESULT } from "@/sanity/types";

type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;

export function StatsBento({ stats }: { stats: AboutPage["stats"] }) {
  return (
    <section className="container-page py-section">
      <ul className="grid gap-gutter md:grid-cols-3">
        {stats?.map((stat, index) => {
          const Icon = resolveIcon(stat.icon);
          return (
            <li key={stat.title} className="h-full">
              <Reveal delay={index * 100} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col items-center gap-4 rounded-2xl border border-border p-10 text-center shadow-ambient",
                    stat.inverted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-8",
                      stat.inverted ? "text-cream" : "text-secondary",
                    )}
                    aria-hidden="true"
                  />
                  <h2
                    className={cn(
                      "text-headline-md",
                      stat.inverted
                        ? "text-primary-foreground"
                        : "text-primary",
                    )}
                  >
                    {stat.title}
                  </h2>
                  <p
                    className={cn(
                      "text-body-md",
                      stat.inverted
                        ? "text-ink-muted"
                        : "text-muted-foreground",
                    )}
                  >
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
