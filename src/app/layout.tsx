import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homeHero, v2Site } from "@/content/site";

import "./globals.css";

/**
 * Public Sans is the typeface of the U.S. Web Design System, so body copy
 * reads the way the federal sites this audience uses every day do. Archivo,
 * set a little wide, gives the headings their engineered character.
 */
const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const description = homeHero.statement;

export const metadata: Metadata = {
  // NEEDS-CONFIRMATION: the production domain.
  metadataBase: new URL("https://www.tanviit.com"),
  title: {
    default: `${v2Site.name} | Federal IT modernization, data, cloud and cybersecurity`,
    template: `%s | ${v2Site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: v2Site.name,
    title: `${v2Site.name} | ${homeHero.headline}`,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a1624",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: v2Site.legalName,
  alternateName: v2Site.name,
  url: "https://www.tanviit.com",
  slogan: v2Site.tagline,
  foundingDate: String(v2Site.founded),
  description,
  email: v2Site.email,
  telephone: v2Site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "4211 Pleasant Valley Road, Suite 230",
    addressLocality: "Chantilly",
    addressRegion: "VA",
    postalCode: "20151",
    addressCountry: "US",
  },
  naics: "541511",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${publicSans.variable} ${archivo.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
