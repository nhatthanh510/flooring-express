"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
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

/**
 * Which fields are required is a lead-quality decision, not a validation one:
 * name/email to answer at all, and phone because the owner's notification
 * email leads with "Call client now". Address and message are optional — an
 * early-stage enquirer may not want to hand over an address yet, and the
 * owner can always ask for it on the phone.
 *
 * The asterisk is aria-hidden: the inputs carry `aria-required`, so screen
 * readers hear "required" instead of "star". The enquiry/flooring toggles
 * always hold a selection and cannot be emptied, so they get no marker.
 *
 * `-ml-1`: FieldLabel lays its children out with `flex gap-2`, so without the
 * pull-back the marker floats a full 8px from its label.
 */
const Req = () => (
  <span aria-hidden="true" className="-ml-1 text-destructive">
    *
  </span>
);

const Optional = () => (
  <span className="-ml-1 font-normal text-muted-foreground">(optional)</span>
);

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
  /** Home also drops the address input — it is optional in the schema, and the
      compact form submits it as empty. */
  showAddress?: boolean;
  className?: string;
};

export function QuoteForm({
  idPrefix = "quote",
  submitLabel,
  interests = flooringInterests,
  defaultEnquiry = "quote",
  defaultFlooring = "hybrid",
  showEnquiryType = false,
  showAddress = true,
  className,
}: QuoteFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      address: "",
      message: "",
    },
  });

  const enquiry = useWatch({ control, name: "enquiry" }) ?? defaultEnquiry;
  const resolvedSubmitLabel = submitLabel ?? enquiryCopy[enquiry].submit;

  async function onSubmit(values: QuoteFormValues) {
    setSubmitError(null);
    const result = await submitQuote(values);
    if (result.ok) {
      // The confirmation is a real page (/thank-you) rather than an inline
      // swap: it survives a refresh, can be linked from the notification
      // email, and gives the visitor somewhere to go next.
      reset();
      router.push("/thank-you");
    } else {
      setSubmitError(result.error);
    }
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
                  className="grid w-full grid-cols-2 lg:grid-cols-4"
                >
                  {enquiryTypes.map((type) => (
                    <ToggleGroupItem
                      key={type}
                      value={type}
                      className={
                        "h-auto min-h-12 w-full whitespace-normal rounded-lg px-3 py-2 text-center text-body-md leading-tight data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                      }
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
            <FieldLabel htmlFor={`${idPrefix}-name`}>
              Full Name
              <Req />
            </FieldLabel>
            <Input
              id={`${idPrefix}-name`}
              autoComplete="name"
              placeholder="John Doe"
              aria-required
              aria-invalid={errors.name ? true : undefined}
              className={inputClass}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={errors.email ? true : undefined}>
            <FieldLabel htmlFor={`${idPrefix}-email`}>
              Email Address
              <Req />
            </FieldLabel>
            <Input
              id={`${idPrefix}-email`}
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="john@example.com"
              aria-required
              aria-invalid={errors.email ? true : undefined}
              className={inputClass}
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <Field data-invalid={errors.phone ? true : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-phone`}>
            Phone Number
            <Req />
          </FieldLabel>
          <Input
            id={`${idPrefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0400 000 000"
            aria-required
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
                  interests.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4",
                )}
              >
                {interests.map((interest) => (
                  <ToggleGroupItem
                    key={interest}
                    value={interest}
                    aria-label={interestLabels[interest]}
                    className={
                      "h-auto min-h-12 w-full whitespace-normal rounded-lg px-3 py-2 text-center text-body-md leading-tight data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    }
                  >
                    {interestLabels[interest]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
          <FieldError errors={[errors.flooring]} />
        </FieldSet>

        {showAddress && (
        <Field data-invalid={errors.address ? true : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-address`}>
            Project Address
            <Optional />
          </FieldLabel>
          <Input
            id={`${idPrefix}-address`}
            // `street-address` rather than `address-line1`: this is a single
            // free-text field, so the browser should offer the whole address.
            autoComplete="street-address"
            placeholder="123 Sandy Bay Rd, Hobart TAS"
            aria-required
              aria-invalid={errors.address ? true : undefined}
            className={inputClass}
            {...register("address")}
          />
          <FieldError errors={[errors.address]} />
        </Field>
        )}

        {/* An open message box, deliberately — anything the visitor wants to
            say, optional. Only the "/ Address" part of the old label moved out,
            into the dedicated field above. */}
        <Field data-invalid={errors.message ? true : undefined}>
          <FieldLabel htmlFor={`${idPrefix}-message`}>
            Message
            <Optional />
          </FieldLabel>
          <Textarea
            id={`${idPrefix}-message`}
            rows={4}
            placeholder="Tell us about your project — approximate size, current flooring, suburb…"
            aria-invalid={errors.message ? true : undefined}
            className="min-h-32 rounded-lg px-4 py-3 text-body-md"
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
