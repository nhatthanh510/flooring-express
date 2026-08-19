"use client";

import { useEffect, useState } from "react";

/**
 * The docs sidebar with the mockup's active state (oak text on a muted pill).
 * A small IntersectionObserver keeps the highlight on the section currently
 * in view, so the static design's "current page" affordance stays truthful
 * while scrolling.
 */
export function ContentsNav({
  items,
}: {
  items: ReadonlyArray<readonly [string, string]>;
}) {
  const [active, setActive] = useState(items[0]?.[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Fire when a section's heading crosses the upper third of the screen.
      { rootMargin: "-15% 0px -75% 0px" },
    );
    for (const [id] of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Contents"
      className="flex flex-col gap-2 border-r border-border pr-4"
    >
      <h2 className="mb-2 text-headline-md text-primary">Contents</h2>
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "true" : undefined}
          className={
            active === id
              ? "rounded bg-muted px-3 py-2 text-label-md font-bold text-secondary transition-colors"
              : "rounded px-3 py-2 text-label-md text-muted-foreground transition-colors hover:bg-surface-low hover:text-secondary"
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
