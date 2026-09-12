import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PinitGrow — Pinterest Research Intelligence",
    template: "%s | PinitGrow",
  },
  description: site.description,
  openGraph: {
    title: "PinitGrow — Pinterest Research Intelligence",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/product/keyword-explorer.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PinitGrow — Pinterest Research Intelligence",
    description: site.description,
    images: ["/product/keyword-explorer.webp"],
  },
  icons: { icon: "/brand/pinitgrow-logo.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: site.url,
  description: site.description,
  offers: {
    "@type": "Offer",
    price: "10",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <div id="content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
