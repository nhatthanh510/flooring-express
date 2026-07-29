"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { useLinkStatus } from "next/link";

import { cn } from "@/lib/utils";

/**
 * A YouTube-style progress bar pinned to the top of the viewport during a route
 * transition.
 *
 * `useLinkStatus` only reports the pending state of its *nearest ancestor
 * `<Link>`*, so a single bar cannot read it directly. The pieces here are the
 * way around that: `<RouteProgressReporter>` goes inside each link and pushes
 * its pending state into this context, and `<RouteProgressBar>` — mounted once
 * in the layout — renders the result.
 */
const RouteProgressContext = createContext<{
  setPending: (id: string, pending: boolean) => void;
  pending: boolean;
}>({ setPending: () => {}, pending: false });

export function RouteProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // A set rather than a boolean: clicking a second link before the first
  // resolves would otherwise let the slower one's cleanup clear the bar while a
  // navigation is still in flight.
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());

  const setPending = useCallback((id: string, pending: boolean) => {
    setPendingIds((current) => {
      if (current.has(id) === pending) return current;
      const next = new Set(current);
      if (pending) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ setPending, pending: pendingIds.size > 0 }),
    [setPending, pendingIds],
  );

  return (
    <RouteProgressContext.Provider value={value}>
      {children}
    </RouteProgressContext.Provider>
  );
}

/**
 * Feeds one link's pending state to the bar. Rendered for you by
 * `@/components/shared/link` — you should not need to place it by hand.
 *
 * Renders nothing: it exists only for the hook, which has to be called from a
 * descendant of the link it reports on.
 *
 * The id is generated rather than passed in. An href would collide whenever the
 * same destination appears twice on a page — the footer and a CTA both pointing
 * at /contact, say — and one unmounting would clear the other's pending state.
 */
export function RouteProgressReporter() {
  const id = useId();
  const { pending } = useLinkStatus();
  const { setPending } = useContext(RouteProgressContext);

  useEffect(() => {
    setPending(id, pending);
    return () => setPending(id, false);
  }, [id, pending, setPending]);

  return null;
}

/**
 * Mount once, in the root layout.
 *
 * Deliberately stateless. The bar needs to linger at 100% for a moment after a
 * navigation resolves, which is tempting to do with a timer and `setState` — but
 * that is a `setState` inside an effect, and the whole behaviour is expressible
 * in CSS: the track fades out on a delay while the fill transitions to full
 * width. See `.route-progress` in globals.css.
 */
export function RouteProgressBar() {
  const { pending } = useContext(RouteProgressContext);

  return (
    <div
      // z-60 clears the sticky header at z-50.
      className="route-progress pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5"
      data-pending={pending || undefined}
      role="progressbar"
      aria-label="Loading page"
      aria-hidden={!pending || undefined}
    >
      <div
        className={cn(
          "route-progress-fill h-full bg-secondary shadow-[0_0_10px_var(--color-secondary)]",
          pending && "route-progress-run",
        )}
      />
    </div>
  );
}
