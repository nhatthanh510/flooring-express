import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Frequently Asked Questions — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Frequently Asked Questions",
    eyebrow: "Expert Guidance",
    description:
      "Answers on products, installation, warranties and ongoing care.",
  });
}
