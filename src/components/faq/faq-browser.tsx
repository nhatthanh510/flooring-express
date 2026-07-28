"use client";

import { useMemo, useState } from "react";
import { Brush, Hammer, Layers, Search, type LucideIcon } from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Input } from "@/components/ui/input";
import type { FaqGroup } from "@/lib/content/faqs";

const groupIcons: Record<string, LucideIcon> = {
  layers: Layers,
  construction: Hammer,
  cleaning: Brush,
};

export function FaqBrowser({ groups }: { groups: readonly FaqGroup[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const total = results.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <div className="relative mx-auto mb-16 max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="faq-search" className="sr-only">
          Search questions
        </label>
        <Input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions (e.g. “Hybrid cleaning”, “Timber installation”)"
          className="h-14 rounded-lg pl-12 pr-4 text-body-md"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {total} question{total === 1 ? "" : "s"} match your search.
      </p>

      {total === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-body-md text-muted-foreground">
          No questions match “{query}”. Try a different term, or{" "}
          <a
            href="#faq-support"
            className="font-semibold text-secondary underline underline-offset-4"
          >
            ask us directly
          </a>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-12">
          {results.map((group) => {
            const Icon = groupIcons[group.icon] ?? Layers;
            return (
              <div key={group.title}>
                <h2 className="mb-6 flex items-center gap-3 text-headline-md text-primary">
                  <Icon
                    className="size-6 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
                  {group.title}
                </h2>
                <FaqAccordion
                  items={group.items}
                  idPrefix={group.title.toLowerCase().replace(/\s+/g, "-")}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
