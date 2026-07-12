import { Reveal } from "@/components/reveal";

/** Section eyebrow + heading + optional intro, with the plank-motif rule. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <div
        className={
          centered ? "flex items-center justify-center gap-3" : "flex items-center gap-3"
        }
      >
        <span aria-hidden className="h-3 w-10 rounded-sm plank-band" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
