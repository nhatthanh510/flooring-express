import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "Premium Flooring Solutions for Hobart Homes — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Premium Flooring Solutions for Hobart Homes",
    eyebrow: "Hobart's Leading Installers",
    description:
      "Hybrid, laminate and timber flooring, installed by Tasmania's specialists.",
  });
}
