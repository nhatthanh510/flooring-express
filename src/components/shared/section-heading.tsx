import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Renders the short oak underline bar used across the mockups */
  rule?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  rule = true,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-label-sm uppercase text-secondary">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="max-w-3xl text-balance text-headline-lg text-primary md:text-display-lg"
      >
        {title}
      </h2>
      {rule && <span className="h-1 w-20 rounded-full bg-secondary" />}
      {description && (
        <p className="max-w-2xl text-pretty text-body-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
