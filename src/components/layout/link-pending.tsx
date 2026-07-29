"use client";

import { useLinkStatus } from "next/link";

/**
 * A dot that fades in beside a nav link while its navigation is in flight.
 *
 * Must be rendered *inside* a `<Link>` — `useLinkStatus` reads the pending
 * state of the nearest ancestor link and returns `{ pending: false }` anywhere
 * else.
 *
 * This is the backstop, not the main event: the route-level `loading.tsx`
 * fallbacks are what make navigation commit immediately. `pending` is skipped
 * entirely once a route has been prefetched, so on a healthy connection this
 * never shows. It earns its place on slow or flaky mobile connections, where
 * the click can land before prefetching has finished and there would otherwise
 * be no acknowledgement at all.
 *
 * `aria-hidden` because the loading state is already announced by the
 * `role="status"` region in each `loading.tsx`; two announcements for one
 * navigation is worse than none.
 */
export function LinkPending() {
  const { pending } = useLinkStatus();

  return <span aria-hidden="true" className="link-hint" data-pending={pending} />;
}
