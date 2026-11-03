import type { Metadata, Viewport } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { brands } from "@/content/brands";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** One family for the whole site: Afacad carries both the display and the body voice. */
const afacad = Afacad({
  subsets: ["latin"],
  variable: "--font-afacad",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Family-owned holding company`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Family-owned holding company`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  foundingDate: String(site.founded),
  founder: site.founders.map((f) => ({ "@type": "Person", name: f.name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rancho Palos Verdes",
    addressRegion: "CA",
    addressCountry: "US",
  },
  subOrganization: brands
    .filter((b) => b.slug !== "jones-and-sons-enterprises")
    .map((b) => ({ "@type": "Organization", name: b.name, ...(b.website ? { url: b.website.href } : {}) })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={afacad.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
