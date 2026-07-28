import type { FlooringSlug } from "./services";

export type Img = { src: string; alt: string };

export type StatChip = { value: string; label: string };
export type MetaItem = { label: string; value: string };
export type FeatureItem = { icon: string; title: string; description: string };
export type SpecRow = { attribute: string; value: string };
export type RoadmapStep = { icon: string; title: string; description: string };

export type CaseStudy = {
  slug: string;
  /** Which product line this project showcases — links back to /services */
  category: FlooringSlug;
  eyebrow: string;
  title: string;
  /** Shorter title used by the "next project" link and gallery cards */
  shortTitle: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  hero: Img;

  /** Key facts strip under the hero (hybrid + laminate layouts) */
  meta?: readonly MetaItem[];

  /** The narrative. `solution` is optional — only the timber study splits it. */
  challenge: {
    heading: string;
    body: string;
    image?: Img;
  };
  solution?: {
    heading: string;
    body: string;
    image?: Img;
    stats?: readonly StatChip[];
  };

  features?: {
    heading?: string;
    description?: string;
    items: readonly FeatureItem[];
  };

  specs?: {
    heading: string;
    description?: string;
    rows: readonly SpecRow[];
  };

  /** Definition-list style project facts (laminate layout) */
  details?: { heading: string; rows: readonly MetaItem[] };

  roadmap?: {
    heading: string;
    description: string;
    steps: readonly RoadmapStep[];
  };

  gallery?: { heading?: string; images: readonly Img[] };

  testimonial?: { quote: string; name: string; role: string; image?: Img };

  /** Optional — the timber study ends at the "next project" link, per its mockup */
  cta?: {
    heading: string;
    description: string;
    /** Each action deep-links to the contact form with its own intent */
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "classic-tasmanian-timber",
    category: "timber",
    eyebrow: "Residential Project",
    title: "Classic Tasmanian Timber",
    shortTitle: "Classic Tasmanian Timber",
    summary:
      "A masterclass in restoration and premium installation in a heritage Hobart home.",
    metaTitle: "Classic Tasmanian Timber",
    metaDescription:
      "A heritage Hobart home restored with Select Grade Tasmanian Oak over a fully re-levelled 1920s subfloor.",
    hero: {
      src: "/images/projects/timber/hero.webp",
      alt: "Heritage Hobart living room with wide-plank Tasmanian Oak flooring and city views.",
    },
    challenge: {
      heading: "The Challenge",
      body: "The original 1920s subfloor presented significant structural irregularities. With a variance of over 15mm across the main living area, a direct installation would have resulted in uneven planks and eventual structural failure. The heritage nature of the building required a solution that respected the existing frame while providing a perfectly level foundation for the new premium timber.",
      image: {
        src: "/images/projects/timber/challenge.webp",
        alt: "Original 1920s subfloor stripped back, with levelling compound and tools in place.",
      },
    },
    solution: {
      heading: "The Solution",
      body: "We implemented a comprehensive multi-stage leveling process using high-density polymer compounds. For the finish, we selected Select Grade Tasmanian Oak—renowned for its stability and warm, consistent tones. The planks were secret-nailed and glued for maximum durability, finished with a low-sheen water-based polyurethane to preserve the natural look of the wood.",
      image: {
        src: "/images/projects/timber/solution-plank.webp",
        alt: "Close-up of Select Grade Tasmanian Oak planks showing natural grain and knots.",
      },
      stats: [
        { value: "120m²", label: "Total Area" },
        { value: "Select", label: "Timber Grade" },
      ],
    },
    specs: {
      heading: "Technical Specifications",
      description: "The rigorous standards behind every plank.",
      rows: [
        { attribute: "Species", value: "Tasmanian Oak (Eucalyptus regnans)" },
        { attribute: "Janka Hardness", value: "5.5 kN" },
        { attribute: "Thickness", value: "19mm Solid Plank" },
        { attribute: "Width", value: "135mm Wide Board" },
        { attribute: "Moisture Content", value: "Kiln dried to 9-14%" },
        { attribute: "Finish", value: "Bona Traffic HD (Extra Matte)" },
      ],
    },
    gallery: {
      images: [
        {
          src: "/images/projects/timber/g1.webp",
          alt: "Sunlit dining room with Tasmanian Oak flooring running to full-height windows.",
        },
        {
          src: "/images/projects/timber/g2.webp",
          alt: "Timber flooring meeting a black hearth with a clean, flush transition.",
        },
        {
          src: "/images/projects/timber/g3.webp",
          alt: "Oak staircase treads matching the main floor, lit from a skylight above.",
        },
        {
          src: "/images/projects/timber/g4.webp",
          alt: "Hallway with continuous Tasmanian Oak boards running the full length.",
        },
        {
          src: "/images/projects/timber/g5.webp",
          alt: "Kitchen island on wide-plank oak with a marble waterfall benchtop.",
        },
        {
          src: "/images/projects/timber/g6.webp",
          alt: "Dining area with dark Tasmanian Oak boards against a charcoal feature wall.",
        },
      ],
    },
  },

  {
    slug: "contemporary-hybrid-oak",
    category: "hybrid",
    eyebrow: "Portfolio Case Study",
    title: "Contemporary Hybrid Oak Residency",
    shortTitle: "Contemporary Hybrid Oak",
    summary:
      "A seamless integration of durability and natural aesthetic for a modern family home in Hobart.",
    metaTitle: "Contemporary Hybrid Oak Project",
    metaDescription:
      "Wide-plank hybrid oak delivering 100% waterproof protection and timber warmth for a busy Sandy Bay family home.",
    hero: {
      src: "/images/projects/hybrid/hero.webp",
      alt: "Open-plan Sandy Bay living space finished in wide-plank hybrid oak.",
    },
    meta: [
      { label: "Project Category", value: "Residential Overhaul" },
      { label: "Location", value: "Sandy Bay, TAS" },
      { label: "Material Selection", value: "Hybrid Oak 'Coastal Mist'" },
      { label: "Installation Time", value: "4 Working Days" },
    ],
    challenge: {
      heading: "The Challenge & Vision",
      body: "The client sought a flooring solution that could withstand the high traffic of a busy family home while maintaining the elegant appearance of authentic European Oak. Our team proposed a Hybrid solution to provide 100% waterproof protection and superior scratch resistance without sacrificing the tactile warmth of timber.",
      image: {
        src: "/images/projects/hybrid/overview.webp",
        alt: "Hybrid oak flooring flowing from the kitchen through to the dining area.",
      },
    },
    features: {
      items: [
        {
          icon: "droplets",
          title: "Waterproof",
          description:
            "Perfect for the open-plan kitchen and dining area where spills are frequent.",
        },
        {
          icon: "badge-check",
          title: "Lifetime Warranty",
          description:
            "Peace of mind for the homeowners with our certified installation guarantee.",
        },
      ],
    },
    gallery: {
      heading: "Dramatic Transformation",
      images: [
        {
          src: "/images/projects/hybrid/before.webp",
          alt: "Open-plan living and dining area finished in wide-plank hybrid oak.",
        },
        {
          src: "/images/projects/hybrid/after.webp",
          alt: "The same living space after installation, brightened by wide-plank hybrid oak.",
        },
        {
          src: "/images/projects/hybrid/install-1.webp",
          alt: "Installer clicking hybrid planks into place with the 5G locking system.",
        },
        {
          src: "/images/projects/hybrid/install-2.webp",
          alt: "Acoustic underlay being rolled out ahead of the hybrid plank installation.",
        },
        {
          src: "/images/projects/hybrid/install-3.webp",
          alt: "Perimeter scotia being fitted to finish the hybrid floor edge.",
        },
      ],
    },
    testimonial: {
      quote:
        "The transformation is beyond what we imagined. Flooring Express didn't just lay planks; they handled every corner with precision. The Hybrid Oak feels as warm as wood but takes the daily chaos of our kids and pets without a mark.",
      name: "Sarah Jenkins",
      role: "Homeowner, Sandy Bay",
      image: {
        src: "/images/projects/hybrid/testimonial.webp",
        alt: "The finished hybrid oak floor in the completed Sandy Bay home.",
      },
    },
    cta: {
      heading: "Inspired by this look?",
      description:
        "Let's discuss how we can bring this contemporary aesthetic and legendary durability to your own space.",
      primary: {
        label: "Request a Similar Look",
        href: "/contact?enquiry=quote&flooring=hybrid",
      },
      secondary: {
        label: "Order Product Samples",
        href: "/contact?enquiry=samples&flooring=hybrid",
      },
    },
  },

  {
    slug: "zenith-commercial-laminate",
    category: "laminate",
    eyebrow: "Case Study",
    title: "The Zenith Workspace: Commercial Laminate",
    shortTitle: "The Zenith Workspace",
    summary:
      "A complete floor transformation for a 1,200sqm headquarters, prioritizing extreme durability without compromising on modern aesthetic appeal.",
    metaTitle: "Modern Commercial Laminate",
    metaDescription:
      "AC5 commercial laminate in Smoked Oak across a 1,240sqm Hobart CBD headquarters, delivered in 14 working days.",
    hero: {
      src: "/images/projects/laminate/hero.webp",
      alt: "Open-plan Hobart CBD office floor finished in Smoked Oak commercial laminate.",
    },
    challenge: {
      heading: "High-Performance Foundations",
      body: "For the Zenith Workspace project, the requirement was clear: a flooring solution that could withstand high foot traffic while maintaining a premium executive look. We selected our Grade AC5 Commercial Laminate in 'Smoked Oak' to achieve a seamless, professional finish across open-plan offices and client meeting zones.",
      image: {
        src: "/images/projects/laminate/overview.webp",
        alt: "Executive meeting zone with Smoked Oak laminate running wall to wall.",
      },
    },
    features: {
      items: [
        {
          icon: "gem",
          title: "Scratch Resistance",
          description:
            "Industrial-grade AC5 overlay prevents surface wear from furniture and grit.",
        },
        {
          icon: "users",
          title: "High Traffic Ready",
          description:
            "Engineered for 50+ employees daily with high-density core stability.",
        },
        {
          icon: "droplets",
          title: "Moisture Defense",
          description:
            "Integrated wax coating on joints prevents swelling from commercial cleaning.",
        },
        {
          icon: "leaf",
          title: "E0 Emission Certified",
          description:
            "Prioritizing indoor air quality for employee health and wellness.",
        },
      ],
    },
    details: {
      heading: "Project Details",
      rows: [
        { label: "Client", value: "Zenith Tech Hub" },
        { label: "Location", value: "Hobart CBD" },
        { label: "Total Area", value: "1,240 sqm" },
        { label: "Timeline", value: "14 Working Days" },
        { label: "Material", value: "Premium AC5 Laminate" },
      ],
    },
    gallery: {
      heading: "Transformation Gallery",
      images: [
        {
          src: "/images/projects/laminate/g1.webp",
          alt: "Glass-walled office corridor running on Smoked Oak commercial laminate.",
        },
        {
          src: "/images/projects/laminate/g2.webp",
          alt: "Client meeting room with laminate flooring and a glass partition.",
        },
        {
          src: "/images/projects/laminate/g3.webp",
          alt: "Reception area showing the seamless laminate finish at the entry.",
        },
      ],
    },
    roadmap: {
      heading: "Project Roadmap",
      description:
        "From initial site survey to the final reveal, we delivered a stress-free transformation within 14 days.",
      steps: [
        {
          icon: "search",
          title: "Day 1: Audit",
          description:
            "Complete subfloor assessment and moisture testing across all 1,200sqm.",
        },
        {
          icon: "ruler",
          title: "Day 3: Prep",
          description:
            "Self-leveling compound applied to ensure a perfectly flat foundation for the planks.",
        },
        {
          icon: "layers",
          title: "Day 5-12: Fit",
          description:
            "Parallel teams install AC5 laminate with 5mm expansion gaps and perimeter trimming.",
        },
        {
          icon: "badge-check",
          title: "Day 14: Handover",
          description:
            "Final QC inspection, protective floor cleaning, and site sign-off with the client.",
        },
      ],
    },
    cta: {
      heading: "Upgrade Your Commercial Space",
      description:
        "Looking for a durable, aesthetic, and cost-effective flooring solution for your business? Our specialists are ready to help you plan your next project.",
      primary: {
        label: "Book a Business Consultation",
        href: "/contact?enquiry=commercial&flooring=laminate",
      },
      secondary: {
        label: "Request a Sample Kit",
        href: "/contact?enquiry=samples&flooring=laminate",
      },
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** The study that follows this one, wrapping around at the end. */
export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
