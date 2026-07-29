"use client";

import { useMemo, useState } from "react";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { Search } from "lucide-react";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Input } from "@/components/ui/input";
import { resolveIcon } from "@/lib/icons";
import type { SanityImage } from "@/sanity/lib/image";
import type { FAQ_GROUPS_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/lib/utils";

const slug = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, "-");

/**
 * Owns the search box (in the hero band) and the results, because both need the
 * same query — hence one client component spanning the two sections.
 */
export function FaqBrowser({
  groups,
  hero,
  heroImage,
  searchPlaceholder,
  support,
}: {
  groups: FAQ_GROUPS_QUERY_RESULT;
  hero: { title?: string | null; description?: string | null } | null;
  heroImage: SanityImage | null | undefined;
  searchPlaceholder: string;
  /** Rendered under the category nav in the sidebar */
  support: React.ReactNode;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question?.toLowerCase().includes(q) ||
            item.answer?.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const total = results.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      {/* Hero band — textured plank photo behind centred copy and the search */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <SanityFillImage
          image={heroImage}
          priority
          sizes="100vw"
          className="opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-surface-lowest/70 via-surface/60 to-surface"
        />

        <div className="container-page relative py-16 text-center md:py-24">
          <h1 className="text-headline-lg-mobile text-primary md:text-display-lg">
            {hero?.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground">
            {hero?.description}
          </p>

          <div className="relative mx-auto mt-10 max-w-xl">
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
              placeholder={searchPlaceholder}
              className="h-14 rounded-lg bg-card pl-12 pr-4 text-body-md shadow-ambient"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-section">
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          {/* Sticky sidebar: jump links then the support card, per the mockup */}
          <aside className="lg:sticky lg:top-28 lg:col-span-3">
            <nav aria-label="FAQ categories" className="mb-8">
              <ul className="flex flex-col gap-1">
                {groups.map((group) => {
                  const Icon = resolveIcon(group.icon);
                  const isVisible = results.some(
                    (r) => r.title === group.title,
                  );
                  return (
                    <li key={group.title}>
                      <a
                        href={`#${slug(group.title ?? "")}`}
                        aria-disabled={!isVisible}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-lg px-3 text-body-md transition-colors",
                          isVisible
                            ? "text-muted-foreground hover:bg-muted hover:text-primary"
                            : "pointer-events-none text-muted-foreground/40",
                        )}
                      >
                        <Icon
                          className="size-5 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {group.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {support}
          </aside>

          <div className="lg:col-span-9">
            <p aria-live="polite" className="sr-only">
              {total} question{total === 1 ? "" : "s"} match your search.
            </p>

            {total === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-body-md text-muted-foreground">
                No questions match &ldquo;{query}&rdquo;. Try a different term,
                or{" "}
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
                  const Icon = resolveIcon(group.icon);
                  return (
                    <div
                      key={group.title}
                      id={slug(group.title ?? "")}
                      className="scroll-mt-28"
                    >
                      <h2 className="mb-6 flex items-center gap-3 text-headline-lg-mobile text-primary md:text-headline-lg">
                        <Icon
                          className="size-7 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {group.title}
                      </h2>
                      <FaqAccordion
                        items={group.items}
                        idPrefix={slug(group.title ?? "")}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
