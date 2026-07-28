import { Reveal } from "@/components/shared/reveal";
import { processSteps } from "@/lib/content/process";
import { cn } from "@/lib/utils";

export function ProcessSteps() {
  return (
    <section id="process" className="container-page scroll-mt-24 py-section">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        <div className="md:sticky md:top-32 md:h-fit md:basis-1/3">
          <h2 className="text-balance text-headline-lg-mobile text-primary md:text-display-lg">
            Our 4-Step Craftsmanship Process.
          </h2>
          <p className="mt-6 text-body-lg text-muted-foreground">
            From initial measure to final sweep, we treat your home with the
            precision and respect it deserves.
          </p>
          <hr className="mt-8 w-16 border-t-2 border-secondary" />
          <p className="mt-4 text-label-sm uppercase text-muted-foreground">
            Tasmanian owned &amp; operated
          </p>
        </div>

        <ol className="flex flex-col gap-12 md:basis-2/3">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <li className="flex items-start gap-6">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-full font-display text-headline-md",
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-high text-primary",
                  )}
                >
                  {step.number}
                </span>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="text-headline-md text-primary">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
