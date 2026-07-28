"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/schemas/quote";
import { subscribeToNewsletter } from "@/lib/submit-quote";

export function NewsletterInput() {
  const [subscribed, setSubscribed] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: NewsletterFormValues) {
    const result = await subscribeToNewsletter(values);
    if (result.ok) setSubscribed(true);
  }

  if (subscribed) {
    return (
      <p
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 text-label-md text-cream"
      >
        <Check className="size-4 shrink-0" aria-hidden="true" />
        You’re on the list — thanks for subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field data-invalid={errors.email ? true : undefined}>
        <FieldLabel htmlFor="newsletter-email" className="sr-only">
          Email address
        </FieldLabel>
        <div className="flex items-center gap-2">
          <Input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="Email"
            aria-invalid={errors.email ? true : undefined}
            className="h-11 border-white/25 bg-white/10 text-primary-foreground placeholder:text-white/50"
            {...register("email")}
          />
          <Button
            type="submit"
            variant="secondary"
            size="icon-lg"
            className="size-11 shrink-0"
            disabled={isSubmitting}
            aria-label="Subscribe to the newsletter"
          >
            {isSubmitting ? <Spinner /> : <ArrowRight />}
          </Button>
        </div>
        {errors.email && (
          <FieldError className="text-cream-dim">
            {errors.email.message}
          </FieldError>
        )}
      </Field>
    </form>
  );
}
