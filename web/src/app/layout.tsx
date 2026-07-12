import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Flooring Supplied & Installed | ${site.region}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "flooring",
    "carpet",
    "timber flooring",
    "hybrid flooring",
    "laminate flooring",
    "vinyl plank",
    "floor installation",
    "flooring installers",
    site.region,
    "Australia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Flooring Supplied & Installed`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Flooring Supplied & Installed`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
