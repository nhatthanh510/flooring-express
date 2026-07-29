import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import {
  RouteProgressBar,
  RouteProgressProvider,
} from "@/components/layout/route-progress";
import { siteUrl } from "@/lib/site-url";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/lib/live";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const legalName = settings?.legalName ?? "";
  const tagline = settings?.tagline ?? "";
  const description = settings?.description ?? "";
  const defaultTitle = `${legalName} | ${tagline}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${settings?.name ?? legalName}`,
    },
    description,
    applicationName: legalName,
    keywords: settings?.keywords ?? [],
    authors: [{ name: legalName, url: siteUrl }],
    creator: legalName,
    publisher: legalName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: siteUrl,
      siteName: legalName,
      title: defaultTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Australian trades sites get a lot of local-intent traffic; make the
    // geography explicit for search engines.
    other: {
      "geo.region": "AU-TAS",
      "geo.placename": settings?.contact?.locality ?? "",
    },
  };
}

export const viewport: Viewport = {
  // Matches --background so the browser chrome blends into the page
  themeColor: "#f9f9f9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* At the root so the bar also covers the 404, which renders its own
            header outside the marketing layout. */}
        <RouteProgressProvider>
          <RouteProgressBar />
          {children}
        </RouteProgressProvider>
      </body>
    </html>
  );
}
