import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "Premium Flooring for Modern Living — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Premium Flooring for Modern Living",
    eyebrow: "Our Services",
    description:
      "Hybrid, laminate and timber — measured, prepared and laid by our own team.",
  });
}
