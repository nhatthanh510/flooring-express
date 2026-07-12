import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
    stega: false,
  });

  if (!product) return { title: "Product not found" };

  const description =
    product.excerpt || `${product.title} — supplied and installed by us.`;
  const ogImage = product.image
    ? urlFor(product.image).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title ?? undefined,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
  });

  if (!product) notFound();

  const imageUrl = product.image
    ? urlFor(product.image).width(1400).height(900).fit("crop").url()
    : null;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/#ranges"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to products
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span aria-hidden className="h-3 w-10 rounded-sm plank-band" />
            {product.category ? (
              <Badge variant="secondary" className="capitalize">
                {product.category}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {product.title}
          </h1>

          {product.excerpt ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {product.excerpt}
            </p>
          ) : null}

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.image?.alt || product.title || ""}
              width={1400}
              height={900}
              className="mt-8 w-full rounded-2xl border border-border/60 object-cover"
              priority
            />
          ) : (
            <div
              aria-hidden
              className="mt-8 aspect-3/2 w-full overflow-hidden rounded-2xl border border-border/60"
            >
              <div className="h-full w-full plank-band opacity-60" />
            </div>
          )}

          {Array.isArray(product.body) && product.body.length > 0 ? (
            <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary">
              <PortableText value={product.body} />
            </div>
          ) : null}

          {/* Conversion nudge — this is a lead-gen site */}
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-border bg-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-medium">Like this range?</p>
              <p className="text-sm text-muted-foreground">
                Book a free in-home measure and we&rsquo;ll bring a sample to
                you.
              </p>
            </div>
            <Button asChild className="h-11 px-6">
              <Link href="/#quote">Get a free quote</Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
