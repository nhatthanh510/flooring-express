import { cn } from "@/lib/utils";

/**
 * Placeholder block for `loading.tsx` fallbacks.
 *
 * `surface-high` rather than `muted` — the skeletons sit on `surface`, and
 * `muted` is only a hair lighter than the page behind them, which reads as a
 * rendering glitch instead of a deliberate placeholder.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-surface-high", className)}
      {...props}
    />
  );
}

export { Skeleton };
