import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { steps } from "@/lib/site";

export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading
        id="process-heading"
        eyebrow="How it works"
        title="Three simple steps to new floors"
        intro="No showroom pressure and no hidden costs — just a straightforward path from first call to finished floor."
      />

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 80}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-4xl font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>
            <h3 className="mt-4 text-xl font-medium tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
