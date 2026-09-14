import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { DataTable } from "@/components/marketing/data-table";
import { PricingSection } from "@/components/marketing/pricing-section";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { plans, trialDays } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: `PinitGrow monthly plans from $10. ${trialDays}-day free trial, no credit card.`,
};

export default function PricingPage() {
  const rows = plans[0]?.rows ?? [];

  return (
    <main>
      <Section className="py-12 pb-0 md:py-16 md:pb-0">
        <Container>
          <SectionHeading as="h1"
            kicker="Pricing"
            title="The right capacity for your next chapter."
            lead={`Explore PinitGrow with a ${trialDays}-day free trial. Then choose the plan that fits your research, from your first niche to your full client roster.`}
            className="mb-0"
          />
        </Container>
      </Section>
      <PricingSection showHeading={false} />
      <Section id="compare" soft className="py-16">
        <Container>
          <SectionHeading kicker="Compare" title="What each plan includes." />
          <DataTable caption="Plan comparison">
            <thead>
              <tr>
                <th scope="col">Capability</th>
                {plans.map((plan) => (
                  <th key={plan.code} scope="col">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.label}>
                  <th scope="row" className="font-medium text-foreground">
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.code} className="text-muted-foreground">
                      {plan.rows[rowIndex]?.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-background">
                <th scope="row" className="font-semibold text-foreground">Monthly price (USD)</th>
                {plans.map((plan) => <td key={plan.code} className="whitespace-nowrap font-semibold text-foreground">{plan.priceLabel}/month</td>)}
              </tr>
            </tfoot>
          </DataTable>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}
