import { Studio } from "./studio";

/**
 * The Studio is entirely client-rendered and talks to Sanity directly, so this
 * route has nothing to prerender and no request-time work to do.
 */
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
