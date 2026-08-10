"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

/**
 * Catches errors thrown by `(marketing)/layout.tsx`, which the marketing
 * `error.tsx` structurally cannot see.
 *
 * That layout is a live failure path, not a theoretical one: it fetches site
 * settings and services on every render and throws outright when no
 * `siteSettings` document comes back. A Sanity outage lands here.
 *
 * There is no header or footer to render at this point — the query that feeds
 * them is exactly what failed — but this still renders inside the root layout,
 * so the fonts, design tokens and global stylesheet all apply. That is the
 * whole reason to have this tier rather than letting it fall through to
 * `global-error.tsx`, which renders its own bare document.
 */
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="We're having trouble loading the site"
      description="Our content service isn't responding. This is on our end and is usually brief, so please try again in a moment."
      digest={error.digest}
      retry={unstable_retry}
    />
  );
}
