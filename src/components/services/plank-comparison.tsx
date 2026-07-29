"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSpecSelection } from "@/components/services/spec-selection";
import { comparisonRows, type FlooringSlug } from "@/lib/flooring";
import type {
  SERVICES_QUERY_RESULT,
  SERVICES_PAGE_QUERY_RESULT,
} from "@/sanity/types";

/**
 * The "Plank Toggle" from DESIGN.md — a selector whose chips read as floor
 * planks — driving a technical comparison table.
 *
 * Takes `services` as a prop rather than importing it: this is a client
 * component, and importing the module would ship every service — images,
 * blurbs and all — to the browser.
 */
export function PlankComparison({
  heading,
  services,
}: {
  heading: NonNullable<SERVICES_PAGE_QUERY_RESULT>["comparisonHeading"];
  services: SERVICES_QUERY_RESULT;
}) {
  const { selected, select } = useSpecSelection();
  const active = services.find((service) => service.slug === selected);

  return (
    <section id="compare" className="scroll-mt-24 bg-muted py-section">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
            {heading?.title}
          </h2>
          <p className="text-body-lg text-muted-foreground">
            {heading?.description}
          </p>

          <ToggleGroup
            type="single"
            value={selected}
            onValueChange={(value) => value && select(value as FlooringSlug)}
            orientation="vertical"
            variant="outline"
            spacing={3}
            aria-label="Choose a flooring type to compare"
            className="mt-2 w-full"
          >
            {services.map((service, index) => (
              <ToggleGroupItem
                key={service.slug}
                value={service.slug ?? ""}
                className="h-auto w-full justify-start gap-4 rounded-xl bg-card p-5 text-left data-[state=on]:border-secondary data-[state=on]:bg-card data-[state=on]:ring-3 data-[state=on]:ring-secondary/20"
              >
                <span
                  aria-hidden="true"
                  className="h-9 w-6 shrink-0 rounded-sm shadow-ambient"
                  style={{
                    backgroundColor: service.plankColor ?? undefined,
                    transform: `rotate(${[-12, 6, -3][index]}deg)`,
                  }}
                />
                <span className="flex flex-col">
                  <span className="text-body-lg font-semibold text-primary">
                    {service.shortName}
                  </span>
                  <span className="text-label-md text-muted-foreground">
                    {service.descriptor}
                  </span>
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="glass-panel w-full rounded-2xl p-8 shadow-ambient md:p-10">
          <h3 className="text-headline-md text-primary">{active?.name}</h3>
          <p className="mt-1 text-label-md text-muted-foreground">
            Typical specification range
          </p>

          <dl className="mt-8 flex flex-col">
            {comparisonRows.map((row) => (
              <div
                key={row.key}
                className="flex items-baseline justify-between gap-6 border-b border-border/60 py-4 last:border-b-0"
              >
                <dt className="text-body-md text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-body-md font-semibold text-primary">
                  {active?.specs?.[row.key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
