import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqPreview } from "@/components/marketing/faq-preview";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingSection } from "@/components/marketing/pricing-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "PinitGrow — Pinterest Research Intelligence" },
  description: site.description,
};

export default function HomePage() {
  return <main><Hero /><TrustStrip /><FeatureGrid /><HowItWorks /><PricingSection /><FaqPreview /><CtaBanner /></main>;
}
