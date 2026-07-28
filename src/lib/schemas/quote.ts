import { z } from "zod";

export const flooringInterests = [
  "hybrid",
  "laminate",
  "timber",
  "other",
] as const;

/**
 * What the visitor actually wants. Every CTA across the site carries one of
 * these, so a "Request a Sample Kit" button and a "Book a Consultation" button
 * no longer land on an identical, undifferentiated form.
 */
export const enquiryTypes = [
  "quote",
  "consultation",
  "samples",
  "commercial",
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiryCopy: Record<
  EnquiryType,
  { label: string; heading: string; description: string; submit: string }
> = {
  quote: {
    label: "Free Measure & Quote",
    heading: "Request a Free Quote",
    description:
      "Fill out the form below and one of our experts will get back to you within 24 hours with a detailed estimate.",
    submit: "Send Quote Request",
  },
  samples: {
    label: "Sample Request",
    heading: "Order Product Samples",
    description:
      "Tell us which finishes you'd like to see and we'll post samples out, or bring them to you so you can check them in your own light.",
    submit: "Send Sample Request",
  },
  consultation: {
    label: "Expert Consultation",
    heading: "Book a Free Consultation",
    description:
      "We'll visit your property, laser-measure the space and talk through the options — no obligation, no charge.",
    submit: "Book Consultation",
  },
  commercial: {
    label: "Commercial Project",
    heading: "Talk to Our Commercial Team",
    description:
      "Tell us about the site, the floor area and your timeline. We'll come back with a staged plan and a fixed quote.",
    submit: "Send Project Brief",
  },
};

export function isEnquiryType(value: string | undefined): value is EnquiryType {
  return enquiryTypes.includes(value as EnquiryType);
}

export function isFlooringInterest(
  value: string | undefined,
): value is (typeof flooringInterests)[number] {
  return flooringInterests.includes(
    value as (typeof flooringInterests)[number],
  );
}

export const quoteSchema = z.object({
  enquiry: z.enum(enquiryTypes, {
    message: "Let us know what you need.",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is a little long — please shorten it."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email address to send your quote.")
    .email("That doesn't look like a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a contactable phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(
      /^[0-9+()\s-]+$/,
      "Phone numbers can only contain digits, spaces and + ( ) -.",
    ),
  flooring: z.enum(flooringInterests, {
    message: "Choose the flooring you're interested in.",
  }),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1000 characters.")
    .optional()
    .or(z.literal("")),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
