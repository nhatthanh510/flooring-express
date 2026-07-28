import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Contact Our Flooring Specialists — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Contact Our Flooring Specialists",
    eyebrow: "Get in Touch",
    description:
      "Free measure and quote, expert consultation, or product samples.",
  });
}
