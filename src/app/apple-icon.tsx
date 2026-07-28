import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#181512",
        color: "#ffddb6",
      }}
    >
      <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>FE</div>
      <div
        style={{
          fontSize: 15,
          letterSpacing: 3,
          color: "#96908b",
          marginTop: 4,
        }}
      >
        HOBART
      </div>
    </div>,
    size,
  );
}
