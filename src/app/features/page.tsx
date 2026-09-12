import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Decision } from "@/components/marketing/decision";
import { ProductShot } from "@/components/marketing/product-shot";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { featurePath } from "@/lib/feature-pages";
import { features } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Keyword Explorer, Ideas, Top Pins, Pin Stats, Account Explorer, Board Explorer, Rank Tracker, and Trends in one Pinterest research workspace.",
};

export default function FeaturesPage() {
  return (
    <main>
      <Section className="py-16 md:py-20">
        <Container>
          <SectionHeading as="h1"
            kicker="Product"
            title={
              <>
                Every tool answers a{" "}
                <span>publishing decision.</span>
              </>
            }
            lead="Start from a seed keyword, reverse-engineer the pins that already rank, and track movement so your next piece of content is based on evidence."
          />
          <div className="grid gap-5 md:gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.id}
                id={feature.id}
                className="surface-card flex h-full flex-col overflow-hidden scroll-mt-28"
              >
                <ProductShot name={feature.shot} className="screenshot-frame-flush" />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {feature.badge}
                  </p>
                  <h3 className="mt-2 text-[1.35rem] leading-snug font-semibold tracking-tight md:text-[1.5rem]">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                  <Decision question={feature.decision} className="mt-5" />
                  <Link
                    href={featurePath(feature.id)}
                    className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-foreground transition-colors duration-[var(--duration-normal)] hover:text-primary"
                  >
                    See complete details
                    <ArrowRight className="size-4 transition-transform duration-[var(--duration-normal)] group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}
