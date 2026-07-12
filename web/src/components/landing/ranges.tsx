import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function Ranges() {
  const { data: products } = await sanityFetch({ query: PRODUCTS_QUERY });

  return (
    <section
      id="ranges"
      aria-labelledby="ranges-heading"
      className="border-y border-border bg-secondary/40"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          id="ranges-heading"
          eyebrow="Browse products"
          title="Explore individual ranges"
          intro="Specific products from our suppliers, with the detail on each. Book a free measure and we'll bring samples to your home so you can see them in your own light."
        />

        {products.length === 0 ? (
          <Reveal className="mt-12">
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Our online range is on its way. In the meantime, call us on{" "}
                  <span className="font-mono text-foreground">1300 000 000</span>{" "}
                  and we&rsquo;ll bring the showroom to you.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => {
              const imageUrl = product.image
                ? urlFor(product.image)
                    .width(800)
                    .height(600)
                    .fit("crop")
                    .url()
                : null;
              return (
                <Reveal key={product._id} delay={i * 60}>
                  <Link href={`/products/${product.slug}`} className="group block">
                    <Card className="h-full gap-0 pt-0 transition-shadow hover:shadow-md">
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.image?.alt || product.title || ""}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div
                            aria-hidden
                            className="h-full w-full opacity-40 plank-band"
                          />
                        )}
                      </div>
                      <CardContent className="pt-4">
                        {product.category ? (
                          <Badge variant="secondary" className="mb-2 capitalize">
                            {product.category}
                          </Badge>
                        ) : null}
                        <h3 className="font-heading text-lg font-medium tracking-tight">
                          {product.title}
                        </h3>
                        {product.excerpt ? (
                          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                            {product.excerpt}
                          </p>
                        ) : null}
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          View range
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
