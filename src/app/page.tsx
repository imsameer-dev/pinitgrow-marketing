import type { Metadata } from "next";
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { BentoGrid } from "@/components/marketing/bento-grid";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqList } from "@/components/marketing/faq-list";
import { FeatureBlock } from "@/components/marketing/feature-block";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { ProductShot } from "@/components/marketing/product-shot";
import { ProofStrip } from "@/components/marketing/proof-strip";
import { Section } from "@/components/marketing/section";
import { TestimonialMarquee } from "@/components/marketing/testimonial-marquee";
import { Button } from "@/components/ui/button";
import { faqs, faqPreviewIds, hero, walkthrough } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "PinitGrow — Pinterest research" },
  description:
    "Use Keyword Explorer, top pins, account and board research, and rank tracking in one cloud Pinterest workspace.",
};

export default function HomePage() {
  const preview = faqPreviewIds.map((index) => faqs[index]);

  return (
    <main>
      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[var(--content-max-width)] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium text-primary">{hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <AppLink path="/register">Start free trial</AppLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {hero.trialNote}
            </p>
          </div>
          <ProductShot
            name="keywords"
            alt="PinitGrow Keyword Explorer with an A–Z suggestion table and popularity scores"
            url="app.pinitgrow.com/app/keywords"
            priority
          />
        </div>
      </section>

      <Section>
        <ProofStrip />
      </Section>

      <Section title="Research that matches how Pinterest actually works">
        <div className="space-y-20">
          {walkthrough.map((item, index) => (
            <FeatureBlock
              key={item.title}
              title={item.title}
              body={item.body}
              href={item.href}
              shot={item.shot}
              shotUrl={item.shotUrl}
              imageLeft={index % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <Section>
        <TestimonialMarquee />
      </Section>

      <Section title="The rest of the toolkit">
        <BentoGrid />
      </Section>

      <Section id="how-it-works" title="How it works">
        <HowItWorks />
      </Section>

      <Section title="Simple monthly plans">
        <PricingTeaser />
      </Section>

      <Section title="Questions">
        <FaqList items={preview} />
        <p className="mt-6 text-sm">
          <Link href="/faq" className="font-medium text-primary">
            See all
          </Link>
        </p>
      </Section>

      <Section>
        <CtaBanner
          title="Start researching Pinterest in the browser"
          body="Three days, no card. The workspace is waiting on app.pinitgrow.com."
        />
      </Section>
    </main>
  );
}
