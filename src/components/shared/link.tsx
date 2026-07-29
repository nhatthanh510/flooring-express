"use client";

import NextLink from "next/link";

import { RouteProgressReporter } from "@/components/layout/route-progress";

/**
 * `next/link` with the route-progress reporter built in. Import this instead of
 * `next/link` anywhere in the app.
 *
 * `useLinkStatus` only reports on its nearest ancestor `<Link>`, so the top
 * progress bar can only see links that contain a reporter. Wiring that up by
 * hand meant the bar knew about the header nav and nothing else — every CTA,
 * card and footer link navigated silently. Putting it here makes coverage the
 * default rather than something each new link has to remember.
 *
 * The reporter renders `null`, so this adds no DOM node and cannot disturb
 * layout — which matters because several callers are `<Button asChild>` or
 * `<SheetClose asChild>` wrappers whose styling assumes a single child element.
 * Spreading `props` keeps `className`, `ref` and handlers flowing through from
 * those Slot-based parents.
 */
export function Link({
  children,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props}>
      {children}
      <RouteProgressReporter />
    </NextLink>
  );
}
