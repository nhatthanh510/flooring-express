/**
 * Sample business data for Flooring Express.
 *
 * Single source of truth for copy and contact details used across the landing
 * page. Placeholder values for now — swap for real data or wire to the Sanity
 * `siteSettings` document (studio/schemaTypes/siteSettings.ts) later.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const site = {
  name: "Flooring Express",
  region: "Sydney",
  description:
    "Carpet, timber, hybrid, laminate and vinyl flooring supplied and professionally installed across Sydney. Free in-home measure and quote, fully insured, workmanship guaranteed.",
  phone: "1300 000 000",
  phoneHref: "tel:1300000000",
  email: "hello@flooringexpress.com.au",
  abn: "00 000 000 000",
  rating: 4.9,
  reviewCount: 312,
  yearsTrading: 18,
  warrantyYears: 10,
  hours: "Mon–Fri 8am–5pm, Sat 9am–2pm",
  serviceAreas: [
    "Sydney CBD",
    "North Shore",
    "Northern Beaches",
    "Eastern Suburbs",
    "Inner West",
    "Hills District",
    "Sutherland Shire",
    "Western Sydney",
  ],
} as const;

/** Flooring categories — mirrors the option list in the Sanity product schema. */
export const services = [
  {
    key: "carpet",
    title: "Carpet",
    blurb:
      "Plush wool and hard-wearing synthetic ranges for bedrooms, lounges and stairs.",
  },
  {
    key: "hardwood",
    title: "Timber",
    blurb:
      "Solid and engineered hardwood that brings warmth and lasting value to any home.",
  },
  {
    key: "hybrid",
    title: "Hybrid",
    blurb:
      "100% waterproof planks built for busy Australian households — kitchens to hallways.",
  },
  {
    key: "laminate",
    title: "Laminate",
    blurb:
      "The look of timber at a friendlier price, with a tough scratch-resistant finish.",
  },
  {
    key: "vinyl",
    title: "Vinyl / LVP",
    blurb:
      "Comfortable underfoot and easy to clean — ideal for wet areas and rentals.",
  },
  {
    key: "tile",
    title: "Tile",
    blurb:
      "Porcelain and ceramic for bathrooms, laundries and outdoor entertaining.",
  },
] as const;

/** Genuine ordered process — numbered markers are meaningful here. */
export const steps = [
  {
    title: "Free measure & quote",
    body: "Book a time that suits you. We measure up in your home, talk through options, and send a clear fixed quote — no obligation.",
  },
  {
    title: "Choose your flooring",
    body: "Browse samples in your own light. We help you match the right product to your rooms, budget and lifestyle.",
  },
  {
    title: "Professional installation",
    body: "Our own qualified installers handle the lot — old floor removed, new floor laid, site left clean. Backed by our workmanship guarantee.",
  },
] as const;

export const trustPoints = [
  { title: "Australian owned", detail: "Local team, local knowledge" },
  { title: "Fully insured", detail: "Public liability & workers' comp" },
  {
    title: `${site.warrantyYears}-year workmanship`,
    detail: "Guaranteed installation",
  },
  { title: "Free in-home measure", detail: "Accurate fixed quotes" },
] as const;

export const testimonials = [
  {
    name: "Sarah M.",
    suburb: "Manly",
    quote:
      "From measure to install, the team was on time and spotless. Our hybrid floors look incredible and the quote never changed.",
  },
  {
    name: "David & Priya",
    suburb: "Parramatta",
    quote:
      "We got three quotes — Flooring Express was the clearest and not the dearest. The installers really knew their stuff.",
  },
  {
    name: "Jenny T.",
    suburb: "Cronulla",
    quote:
      "New wool carpet through the whole upstairs in a day. Friendly, tidy, and they moved the furniture back for us.",
  },
  {
    name: "Michael R.",
    suburb: "Chatswood",
    quote:
      "Engineered timber in the living room — flawless finish. Genuinely the easiest reno decision we made.",
  },
] as const;

export const faqs = [
  {
    q: "Do you service my area?",
    a: `We install right across greater ${site.region}, including ${site.serviceAreas
      .slice(0, 4)
      .join(", ")} and beyond. Not sure? Give us a call on ${site.phone}.`,
  },
  {
    q: "Is the measure and quote really free?",
    a: "Yes. We come to your home, measure accurately and give you a clear fixed-price quote with no obligation and no pressure.",
  },
  {
    q: "How long does installation take?",
    a: "Most homes are done in one to three days depending on size and floor type. We'll give you a firm timeframe with your quote.",
  },
  {
    q: "What warranty do I get?",
    a: `Every installation is covered by our ${site.warrantyYears}-year workmanship guarantee, on top of the manufacturer's product warranty.`,
  },
  {
    q: "Can you remove my old flooring?",
    a: "Absolutely — removal and disposal of your existing floor can be included in the quote so you deal with one team from start to finish.",
  },
] as const;
