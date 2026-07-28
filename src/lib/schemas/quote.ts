import { z } from "zod";

export const flooringInterests = ["hybrid", "laminate", "timber", "other"] as const;

export const quoteSchema = z.object({
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
    .regex(/^[0-9+()\s-]+$/, "Phone numbers can only contain digits, spaces and + ( ) -."),
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

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address.")
    .email("That doesn't look like a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
