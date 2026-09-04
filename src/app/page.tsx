import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqPreview } from "@/components/marketing/faq-preview";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingSection } from "@/components/marketing/pricing-section";
import { ProblemSection } from "@/components/marketing/problem-section";
import { StatsAndDeepDives } from "@/components/marketing/stats-and-deep-dives";
import { Testimonials } from "@/components/marketing/testimonials";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "PinitGrow — Pinterest Research Intelligence" },
  description: site.description,
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <FeatureGrid />
      <HowItWorks />
      <StatsAndDeepDives />
      <Testimonials />
      <PricingSection />
      <FaqPreview />
      <CtaBanner />
    </main>
  );
}
