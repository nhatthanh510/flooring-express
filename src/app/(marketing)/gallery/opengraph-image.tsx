import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Our Portfolio — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Our Portfolio",
    eyebrow: "Recent Work",
    description:
      "Residential and commercial flooring installations across Hobart.",
  });
}
