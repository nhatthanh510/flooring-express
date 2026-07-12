import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const { data: products } = await sanityFetch({ query: PRODUCTS_QUERY });

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Flooring Express</h1>
      <p className="mt-2 text-neutral-500">Flooring and carpet for every room.</p>

      <h2 className="mt-12 text-sm font-medium uppercase tracking-wide text-neutral-500">
        Products
      </h2>

      {products.length === 0 ? (
        <p className="mt-4 text-neutral-500">
          No products yet. Add one in the Studio at{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
            localhost:3333
          </code>
          .
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
          {products.map((product) => (
            <li key={product._id} className="py-3">
              <Link
                href={`/products/${product.slug}`}
                className="flex items-baseline justify-between gap-4 hover:underline"
              >
                <span>{product.title}</span>
                {product.category && (
                  <span className="text-xs uppercase tracking-wide text-neutral-400">
                    {product.category}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
