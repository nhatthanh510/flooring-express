import type { Metadata, Viewport } from "next";

/**
 * The Studio takes over the whole viewport and brings its own styling, so it
 * gets a layout that opts out of the marketing chrome entirely — no header,
 * footer or skip link. It still sits inside the root layout's <html>/<body>.
 *
 * These two exports mirror what `next-sanity/studio` publishes. They are
 * written out rather than re-exported because that barrel reaches into the
 * `sanity` package, which must not enter the server graph (see ./[[...tool]]/studio.tsx).
 */
export const metadata: Metadata = {
  title: "Flooring Express — Studio",
  referrer: "same-origin",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
