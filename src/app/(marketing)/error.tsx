"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

/**
 * Catches render and data errors thrown by any marketing *page*.
 *
 * This is the boundary that will fire in practice — a Sanity query timing out
 * mid-render on /services, say. It sits inside `(marketing)/layout.tsx`, so the
 * header, nav and footer stay put and the visitor can navigate away instead of
 * hitting a dead end.
 *
 * It deliberately does not cover `(marketing)/layout.tsx` itself: an `error.tsx`
 * never wraps the layout in its own segment. That case is handled one level up
 * by `app/error.tsx`.
 *
 * Boundaries are handed both `reset` and `unstable_retry` (added in 16.2).
 * `unstable_retry` is the one to use: `reset` only clears the error state and
 * re-renders from what the client already has, so it cannot recover from a
 * Server Component failure — which is every error this boundary will actually
 * see, since the failures here come from Sanity queries during server render.
 */
export default function MarketingError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // No error reporting service is wired up yet; the server-side log plus the
    // digest shown to the visitor is what there is to correlate against.
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      description="This page didn't load properly. It's usually temporary — try again, or head back and take another route."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
