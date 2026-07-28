export type Faq = { question: string; answer: string };

export type FaqGroup = {
  title: string;
  /** Key into the icon map in components/faq/faq-icons.ts */
  icon: string;
  items: readonly Faq[];
};

/**
 * The four questions shown in the home page FAQ section. Kept short and
 * conversion-oriented; the full set lives on /faq.
 */
export const homeFaqs: readonly Faq[] = [
  {
    question: "What is hybrid flooring?",
    answer:
      "Hybrid flooring is a revolutionary flooring innovation that combines the best attributes of laminate and vinyl. It features a rigid core made from a limestone and plastic composite (SPC), providing ultimate durability and 100% waterproof performance. It mimics the natural look of timber while being tough enough for high-traffic areas and wet zones like kitchens and laundries.",
  },
  {
    question: "How long does installation take?",
    answer:
      "The timeline for installation depends on the size of the project and the type of existing subfloor. Generally, for a standard residential home (80-120 sqm), professional installation takes approximately 1 to 3 business days. This includes floor preparation, laying the underlay (if required), and precision-fitting the planks and skirting.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes, absolutely. We provide a lifetime structural warranty on all our premium products, alongside a 25-year residential wear warranty. Additionally, our expert installation services come with a 24-month craftsmanship guarantee, giving you complete peace of mind that your floor will perform and look stunning for decades.",
  },
  {
    question: "Can I install flooring over existing tiles?",
    answer:
      "In most cases, yes! Hybrid and laminate flooring can often be installed directly over existing flat, stable ceramic tiles. This saves time and significant costs on demolition. We conduct a detailed site inspection to ensure your tiles are level enough to support a flawless new finish.",
  },
];

/** The grouped set on the dedicated /faq page. */
export const faqGroups: readonly FaqGroup[] = [
  {
    title: "Products",
    icon: "layers",
    items: [
      {
        question:
          "What is the difference between Hybrid and Laminate flooring?",
        answer:
          "Hybrid flooring combines the best attributes of laminate and vinyl. It is 100% waterproof, unlike traditional laminate, making it ideal for wet areas like kitchens. Laminate is typically made from composite wood, while Hybrid uses a stone-plastic composite (SPC) or wood-plastic composite (WPC) core, offering superior stability and durability against temperature fluctuations.",
      },
      {
        question:
          "Is Timber flooring suitable for areas with high direct sunlight?",
        answer:
          "While timber is a natural product and will age gracefully, prolonged exposure to harsh UV rays can cause fading or “suntanning.” We recommend using UV-resistant window films or blinds in north-facing rooms. Our engineered timber ranges come with high-quality UV-cured lacquers that provide significant protection compared to site-finished floors.",
      },
    ],
  },
  {
    title: "Installation Process",
    icon: "construction",
    items: [
      {
        question: "How long does a typical home installation take?",
        answer:
          "For a standard 3-bedroom home (approx. 80-100sqm), installation usually takes 2-3 business days. This includes sub-floor preparation, laying the underlay and flooring, and installing finishing trims. Complex patterns like Herringbone or extensive sub-floor leveling may extend this timeline.",
      },
      {
        question:
          "Do I need to move my furniture before the installers arrive?",
        answer:
          "Yes, rooms must be cleared of all furniture and appliances before the team arrives. If you require assistance with heavy items, please let us know during the quoting process so we can include a “Furniture Move” service in your estimate.",
      },
    ],
  },
  {
    title: "Care & Maintenance",
    icon: "cleaning",
    items: [
      {
        question: "What is the best way to clean my new flooring?",
        answer:
          "We recommend regular sweeping or vacuuming with a soft brush attachment. For mopping, use a PH-neutral cleaner specifically designed for your floor type (Timber, Laminate, or Hybrid). Avoid steam mops on timber and laminate, as the intense heat and moisture can damage the structural integrity.",
      },
    ],
  },
];

export const allFaqs: readonly Faq[] = faqGroups.flatMap((g) => g.items);
