"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

/**
 * The Studio is confined to a client module on purpose.
 *
 * `sanity.config.ts` pulls in the whole `sanity` package, which transitively
 * imports `swr`. Under the `react-server` export condition swr resolves to a
 * stub with no default export, so importing the config from a server component
 * fails the Turbopack build outright. Keeping the import behind "use client"
 * means it is only ever resolved through the client and client-SSR graphs,
 * where swr is its normal self.
 */
export function Studio() {
  return <NextStudio config={config} />;
}
