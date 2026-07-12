import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
  });

  if (!product) notFound();

  const imageUrl = product.image
    ? urlFor(product.image).width(1200).height(675).fit("crop").url()
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to products
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {product.title}
      </h1>
      {product.category && (
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
          {product.category}
        </p>
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={product.image?.alt || product.title || ""}
          width={1200}
          height={675}
          className="mt-6 rounded-lg"
        />
      )}

      {product.excerpt && (
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300">
          {product.excerpt}
        </p>
      )}

      {Array.isArray(product.body) && product.body.length > 0 && (
        <div className="prose mt-6 dark:prose-invert">
          <PortableText value={product.body} />
        </div>
      )}
    </main>
  );
}
