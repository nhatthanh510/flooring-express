import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — flooring supplied and installed across ${site.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #2E5C8A 0%, #24496E 60%, #1B3A57 100%)",
          color: "#FBFBF9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "14px",
              borderRadius: "3px",
              background:
                "repeating-linear-gradient(90deg,#E6C79B 0 18px,#D8B382 18px 36px)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {`Supplied & installed · ${site.region}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Beautiful floors, fitted by people who care.
          </div>
          <div style={{ fontSize: "34px", opacity: 0.9, display: "flex" }}>
            {`${site.name} · Free measure & quote · Rated ${site.rating} from ${site.reviewCount} reviews`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
