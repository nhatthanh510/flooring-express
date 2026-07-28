/**
 * Single source of truth for everything about the business.
 *
 * The Stitch mockups disagreed with each other on the contact details (two
 * different email domains, three phone formats, two closing times). The values
 * below are the most frequently occurring variant of each — they are
 * PLACEHOLDER DATA and should be replaced with the real details before launch.
 */

export const siteConfig = {
  name: "Flooring Express",
  legalName: "Flooring Express Hobart",
  url: "https://flooringexpress.com.au",
  tagline: "Premium flooring solutions for Hobart homes",
  description:
    "Expert flooring installation in Hobart. Specializing in Hybrid, Laminate, and Timber flooring solutions for premium homes.",
  blurb:
    "Hobart's first choice for premium flooring installations. Quality products, expert service, and locally owned.",

  contact: {
    phone: "(03) 6200 0000",
    phoneHref: "tel:+61362000000",
    email: "hello@flooringexpress.com.au",
    street: "123 Collins Street",
    locality: "Hobart",
    region: "TAS",
    postcode: "7000",
    country: "AU",
  },

  hours: [
    { days: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { days: "Saturday", time: "9:00 AM - 4:00 PM" },
    { days: "Sunday", time: "Closed", closed: true },
  ],

  /** Schema.org openingHours format, derived from the table above. */
  openingHoursSpec: ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00"],

  serviceAreas: [
    "Hobart CBD",
    "Sandy Bay",
    "Kingston",
    "Glenorchy",
    "Bellerive",
    "Mount Nelson",
    "Eastern Shore",
    "Clarence",
    "Kingborough",
  ],

  stats: {
    yearsExperience: "15+",
    familiesServed: "500+",
  },
} as const;

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerColumns = [
  {
    title: "Our Products",
    links: [
      { href: "/services#hybrid", label: "Hybrid Flooring" },
      { href: "/services#laminate", label: "Laminate Flooring" },
      { href: "/services#timber", label: "Timber Flooring" },
      { href: "/services#process", label: "Installation Process" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/gallery", label: "Recent Projects" },
      { href: "/about", label: "Local Expertise" },
      { href: "/contact", label: "Request a Quote" },
      { href: "/about#specifications", label: "Technical Specs" },
    ],
  },
] as const;

export const fullAddress = `${siteConfig.contact.street}, ${siteConfig.contact.locality} ${siteConfig.contact.region} ${siteConfig.contact.postcode}`;
