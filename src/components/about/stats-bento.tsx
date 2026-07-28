import { Reveal } from "@/components/shared/reveal";
import { aboutStats } from "@/lib/content/about";
import { cn } from "@/lib/utils";

export function StatsBento() {
  return (
    <section className="container-page py-section">
      <ul className="grid gap-gutter md:grid-cols-3">
        {aboutStats.map((stat, index) => {
          const Icon = stat.icon;
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
                      stat.inverted ? "text-primary-foreground" : "text-primary",
                    )}
                  >
                    {stat.title}
                  </h2>
                  <p
                    className={cn(
                      "text-body-md",
                      stat.inverted ? "text-ink-muted" : "text-muted-foreground",
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
