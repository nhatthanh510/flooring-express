import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the charcoal "FE" monogram over the brand ink colour. Generated at
 * build time so there is no binary asset to keep in sync with the palette.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#181512",
        color: "#ffddb6",
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: -0.5,
        borderRadius: 6,
      }}
    >
      FE
    </div>,
    size,
  );
}
