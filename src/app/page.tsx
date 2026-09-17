import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqPreview } from "@/components/marketing/faq-preview";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingSection } from "@/components/marketing/pricing-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { homeUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      {/* Next.js metadata API drops the trailing slash for the site origin. */}
      <link rel="canonical" href={homeUrl} />
      <meta property="og:url" content={homeUrl} />
      <main>
        <Hero />
        <TrustStrip />
        <FeatureGrid />
        <HowItWorks />
        <PricingSection />
        <FaqPreview />
        <CtaBanner />
      </main>
    </>
  );
}
