import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    "flooring Hobart",
    "hybrid flooring",
    "laminate flooring",
    "timber flooring",
    "flooring installation Tasmania",
    "floor installers Hobart",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
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
    "geo.placename": siteConfig.contact.locality,
  },
};

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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
