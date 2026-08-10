import { ImageResponse } from "next/og";

import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared Open Graph card. Routes re-export this from their own `opengraph-image`
 * file with their own title, so a shared link shows what was actually shared
 * rather than one generic image.
 */
export async function OgImage({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
}) {
  // `stega: false` — the invisible edit markers would render as stray glyphs
  // in the generated PNG.
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#181512",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      {/* Oak rule, echoing the section underline used across the site */}
      <div
        style={{
          display: "flex",
          width: 96,
          height: 8,
          background: "#735a3a",
          borderRadius: 4,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#e2c19b",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 40 ? 68 : 84,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 30,
              color: "#96908b",
              marginTop: 24,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: "#ffffff" }}>
          {settings?.name}
        </div>
        <div style={{ fontSize: 26, color: "#96908b" }}>
          {`Hybrid · Laminate · Timber · ${settings?.contact?.locality ?? ""}`}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
