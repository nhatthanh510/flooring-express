"use client";

import { Link } from "@/components/shared/link";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Shared body for the error boundaries.
 *
 * The three `error.tsx` files differ only in which layout survives around them,
 * so the copy and controls live here rather than being pasted three times.
 *
 * `digest` is deliberately surfaced. In production Next.js strips the original
 * message before forwarding the error to the client, so the digest is the only
 * handle a caller has that ties their report to a specific entry in the server
 * logs — without it, "the quote page broke" is unsearchable.
 */
export function ErrorState({
  title,
  description,
  digest,
  retry,
}: {
  title: string;
  description: string;
  digest?: string;
  retry: () => void;
}) {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center md:py-section">
      <h1 className="text-balance text-headline-lg-mobile text-primary md:text-display-lg">
        {title}
      </h1>
      <p className="max-w-xl text-pretty text-body-lg text-muted-foreground">
        {description}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Wired to `unstable_retry`, which re-fetches and re-renders the
            segment on the server inside a Transition. A transient Sanity blip
            clears without a full reload, and Client Component state outside the
            boundary survives. */}
        <Button size="xl" onClick={retry}>
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      {digest && (
        <p className="text-label-sm text-muted-foreground">
          Reference code: <code className="font-mono">{digest}</code>
        </p>
      )}
    </div>
  );
}
