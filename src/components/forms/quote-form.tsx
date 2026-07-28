"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  enquiryCopy,
  enquiryTypes,
  flooringInterests,
  quoteSchema,
  type EnquiryType,
  type QuoteFormValues,
} from "@/lib/schemas/quote";
import { submitQuote } from "@/lib/submit-quote";
import { cn } from "@/lib/utils";

const interestLabels: Record<(typeof flooringInterests)[number], string> = {
  hybrid: "Hybrid",
  laminate: "Laminate",
  timber: "Timber",
  other: "Other",
};

const inputClass = "h-12 rounded-lg text-body-md";

type QuoteFormProps = {
  /** Distinguishes the two instances so field ids stay unique on the same page */
  idPrefix?: string;
  /** Submit label — the mockups word this differently on home vs contact */
  submitLabel?: string;
  /** Which flooring options to offer; home omits "Other", per the mockup */
  interests?: readonly (typeof flooringInterests)[number][];
  /** Preselected from the CTA the visitor arrived through */
  defaultEnquiry?: EnquiryType;
  defaultFlooring?: (typeof flooringInterests)[number];
  /** Home shows a compact form; contact shows the enquiry-type selector */
  showEnquiryType?: boolean;
  className?: string;
};

export function QuoteForm({
  idPrefix = "quote",
  submitLabel,
  interests = flooringInterests,
  defaultEnquiry = "quote",
  defaultFlooring = "hybrid",
  showEnquiryType = false,
  className,
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // The success panel replaces the form, so move focus to it — otherwise focus
  // falls back to <body> and screen-reader users lose their place.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiry: defaultEnquiry,
      flooring: defaultFlooring,
      message: "",
    },
  });

  const enquiry = useWatch({ control, name: "enquiry" }) ?? defaultEnquiry;
  const resolvedSubmitLabel = submitLabel ?? enquiryCopy[enquiry].submit;

  async function onSubmit(values: QuoteFormValues) {
    setSubmitError(null);
    const result = await submitQuote(values);
    if (result.ok) {
      setSubmitted(true);
      reset();
    } else {
      setSubmitError(result.error);
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={cn(
          "flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8 md:p-12",
          className,
        )}
      >
        <CircleCheck className="size-10 text-secondary" aria-hidden="true" />
        <h3 className="text-headline-md text-primary">
          Thanks — your request is in.
        </h3>
        <p className="text-body-md text-muted-foreground">
          One of our Hobart flooring specialists will get back to you within 24
          hours with a detailed estimate. If it’s urgent, give us a call and
          we’ll bring samples to you.
        </p>
        <Button variant="outline" size="lg" onClick={() => setSubmitted(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("flex flex-col gap-6", className)}
    >
      <FieldGroup>
        {showEnquiryType && (
          <FieldSet data-invalid={errors.enquiry ? true : undefined}>
            <FieldLegend variant="label">What do you need?</FieldLegend>
            <Controller
              control={control}
              name="enquiry"
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => value && field.onChange(value)}
                  onBlur={field.onBlur}
                  variant="outline"
                  spacing={2}
                  className="grid w-full grid-cols-2 sm:grid-cols-4"
                >
                  {enquiryTypes.map((type) => (
                    <ToggleGroupItem
                      key={type}
                      value={type}
                      className="h-12 w-full rounded-lg text-body-md data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {enquiryCopy[type].label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
            <FieldError errors={[errors.enquiry]} />
          </FieldSet>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={errors.name ? true : undefined}>
            <FieldLabel htmlFor={`${idPrefix}-name`}>Full Name</FieldLabel>
            <Input
              id={`${idPrefix}-name`}
              autoComplete="name"
              placeholder="John Doe"
              aria-invalid={errors.name ? true : undefined}
              className={inputClass}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={errors.email ? true : undefined}>
            <FieldLabel htmlFor={`${idPrefix}-email`}>Email Address</FieldLabel>
            <Input
              id={`${idPrefix}-email`}
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="john@example.com"
              aria-invalid={errors.email ? true : undefined}
              className={inputClass}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <Field data-invalid={errors.phone ? true : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-phone`}>Phone Number</FieldLabel>
          <Input
            id={`${idPrefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0400 000 000"
            aria-invalid={errors.phone ? true : undefined}
            className={inputClass}
            {...register("phone")}
          />
          <FieldError errors={[errors.phone]} />
        </Field>

        <FieldSet data-invalid={errors.flooring ? true : undefined}>
          <FieldLegend variant="label">Flooring Interest</FieldLegend>
          <Controller
            control={control}
            name="flooring"
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(value) => value && field.onChange(value)}
                onBlur={field.onBlur}
                variant="outline"
                spacing={2}
                className={cn(
                  "grid w-full grid-cols-2",
                  interests.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4",
                )}
              >
                {interests.map((interest) => (
                  <ToggleGroupItem
                    key={interest}
                    value={interest}
                    aria-label={interestLabels[interest]}
                    className="h-12 w-full rounded-lg text-body-md data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {interestLabels[interest]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
          <FieldError errors={[errors.flooring]} />
        </FieldSet>

        <Field data-invalid={errors.message ? true : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-message`}>
            Message (Project Size / Address)
          </FieldLabel>
          <Textarea
            id={`${idPrefix}-message`}
            rows={4}
            placeholder="Tell us about your project — approximate size, current flooring, suburb…"
            aria-invalid={errors.message ? true : undefined}
            className="rounded-lg text-body-md"
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>
      </FieldGroup>

      {submitError && (
        <p role="alert" className="text-body-md text-destructive">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        size="xl"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            {resolvedSubmitLabel}
            <ArrowRight data-icon="inline-end" />
          </>
        )}
      </Button>
    </form>
  );
}
