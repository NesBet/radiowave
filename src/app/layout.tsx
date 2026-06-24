import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://radiowaveke.vercel.app";
const siteName = "Radiowaveke";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Live Radio Streaming`,
    template: `%s | ${siteName}`,
  },
  description:
    "Stream your favorite Kenyan radio stations live. NRG, Hot 96, Classic 105, Kiss 100, Homeboyz Radio, Capital FM and more — free and unlimited.",
  keywords: [
    "Kenyan radio",
    "live radio streaming",
    "NRG Radio",
    "Hot 96",
    "Classic 105",
    "Kiss 100",
    "Homeboyz Radio",
    "Capital FM",
    "radio online",
    "Kenyan music",
    "Kenya music",
    "Kenya music wave",
    "RadioWave",
    "RadioWave Kenya",
    "RadioWave Vercel",
  ],
  authors: [{ name: siteName }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: `${siteName} | Live Radio Streaming`,
    description:
      "Stream your favorite Kenyan radio stations live. NRG, Hot 96, Classic 105, Kiss 100, and more.",
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Live Radio Streaming`,
    description:
      "Stream your favorite Kenyan radio stations live. NRG, Hot 96, Classic 105, Kiss 100, and more.",
  },
  icons: { icon: "/favicon.jpg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteName,
  url: siteUrl,
  description:
    "Stream your favorite Kenyan radio stations live. NRG, Hot 96, Classic 105, Kiss 100, and more.",
  applicationCategory: "Multimedia",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
