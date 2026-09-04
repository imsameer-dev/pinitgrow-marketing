import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ProductShot } from "@/components/marketing/product-shot";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { features } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Keyword Explorer, Ideas, Top Pins, Pin Stats, Account Explorer, Board Explorer, Rank Tracker, and Trends in one Pinterest research workspace.",
};

export default function FeaturesPage() {
  return (
    <main>
      <Section>
        <Container>
          <SectionHeading
            kicker="Product"
            title="Every tool answers a publishing decision."
            lead="Start from a seed keyword, reverse-engineer the pins that already rank, and track movement so your next piece of content is based on evidence."
          />
          <div className="space-y-20">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                id={feature.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-xs font-black tracking-[0.12em] text-primary uppercase">
                    {feature.badge}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground">{feature.body}</p>
                  <dl className="mt-6 grid gap-3 text-sm">
                    <div>
                      <dt className="font-semibold">You start with</dt>
                      <dd className="text-muted-foreground">{feature.input}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">You get</dt>
                      <dd className="text-muted-foreground">{feature.output}</dd>
                    </div>
                  </dl>
                </div>
                <ProductShot
                  name={feature.shot}
                  title={feature.title}
                  className={index % 2 === 1 ? "lg:order-1" : undefined}
                />
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}
