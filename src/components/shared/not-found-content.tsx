import { createElement } from "react";
import { Link } from "@/components/shared/link";

import { SanityFillImage } from "@/components/shared/sanity-image";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { NOT_FOUND_PAGE_QUERY_RESULT } from "@/sanity/types";

/**
 * Copy of last resort.
 *
 * Hardcoding content is against the rule in AGENTS.md, and this is the case that
 * earns the exception: the singleton may not be authored yet, and a 404 is what
 * renders when something has already gone wrong. A blank page there is a worse
 * failure than a slightly generic sentence.
 */
const FALLBACK = {
  heading: "404 — Page not found",
  description:
    "The page you're looking for has been moved, removed, or never existed. Let's get you back on solid ground.",
} as const;

/**
 * The visual treatment differs by breakpoint because the two mockups do:
 *
 *  - Phones get the photo framed in a card with the "404" numeral over it.
 *  - Desktop gets the same photo faded behind the copy, with a round badge icon.
 *
 * Both are driven by one set of Sanity fields, so an editor writes the heading,
 * the description and the actions once. `actions` renders as a stacked column of
 * buttons on mobile and a four-up card grid from `md`.
 */
export function NotFoundContent({
  page,
}: {
  page: NOT_FOUND_PAGE_QUERY_RESULT;
}) {
  const actions = page?.actions ?? [];
  const helpLinks = page?.helpPanel?.links ?? [];

  return (
    <main
      id="main"
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden"
    >
      {/* Desktop backdrop. Hidden below md, where the photo appears framed
          inside the content instead — rendering both would download it twice. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-20 md:block"
      >
        <SanityFillImage image={page?.image} sizes="100vw" />
      </div>

      <div className="container-page relative z-10 mx-auto max-w-4xl py-16 text-center md:py-24">
        {/* Mobile hero: the numeral sits on the photo, per the mobile mockup. */}
        {/* `bg-primary` sits under the photo so that an unset image degrades to
            a charcoal brand block rather than the flat grey of a scrim over
            nothing — SanityFillImage renders null when the asset is missing. */}
        <div className="relative mb-8 aspect-square w-full overflow-hidden rounded-xl border border-border bg-primary shadow-lg md:hidden">
          <SanityFillImage image={page?.image} sizes="100vw" priority />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="font-display text-8xl font-bold text-white drop-shadow-2xl">
              404
            </span>
          </div>
        </div>

        <div className="mb-8 hidden size-24 items-center justify-center rounded-full bg-accent text-accent-foreground md:inline-flex">
          {/* `createElement` rather than `const Icon = resolveIcon(...)`:
              assigning to a capitalised binding in a component body trips
              `react-hooks/static-components`. The rule guards against components
              defined during render, which this is not — `resolveIcon` only looks
              one up in a static registry — but the shape is what it matches on,
              and restructuring beats suppressing it. */}
          {/* Falls back to "search", not to `resolveIcon`'s own default — that
              is a tick, which reads as success on an error page. */}
          {createElement(resolveIcon(page?.icon ?? "search"), {
            className: "size-12",
            strokeWidth: 1.5,
            "aria-hidden": "true",
          })}
        </div>

        <h1 className="text-balance text-headline-lg-mobile text-primary md:text-display-lg">
          {page?.heading ?? FALLBACK.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground">
          {page?.description ?? FALLBACK.description}
        </p>

        {actions.length > 0 && (
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {actions.map((action, index) => {
              // Resolved here rather than in a child component: assigning a
              // component to a capitalised binding in a component body trips
              // `react-hooks/static-components`. Every other icon in the app is
              // resolved inside its `.map()` for the same reason.
              const Icon = resolveIcon(action.icon);

              // The three weights both mockups use: the first is solid, the
              // second is oak on mobile only, the rest are bordered. The desktop
              // grid wants all four to read as equal cards, so the oak treatment
              // is reverted at `md`.
              const isPrimary = index === 0;
              const isSecondary = index === 1;

              return (
                <li key={`${action.href}-${index}`} className="contents">
                  <Link
                    href={action.href ?? "/"}
                    className={cn(
                      "flex items-center justify-center gap-3 rounded-xl p-4 text-label-md transition-all duration-300",
                      "md:flex-col md:gap-3 md:p-6",
                      isPrimary &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                      isSecondary &&
                        "bg-secondary text-secondary-foreground hover:bg-secondary/90 md:border md:border-border md:bg-surface md:text-foreground md:hover:border-secondary md:hover:bg-surface md:hover:shadow-lg",
                      !isPrimary &&
                        !isSecondary &&
                        "border border-border bg-surface text-foreground hover:border-secondary hover:shadow-lg",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0 md:size-8",
                        !isPrimary && "md:text-secondary",
                      )}
                      aria-hidden="true"
                    />
                    {action.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {helpLinks.length > 0 && (
          <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-surface-highest bg-surface-low p-6">
            {page?.helpPanel?.title && (
              <p className="text-label-md text-muted-foreground">
                {page.helpPanel.title}
              </p>
            )}
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {helpLinks.map((link, index) => (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href ?? "/"}
                  className="inline-flex min-h-11 items-center px-2 text-label-sm text-secondary underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

