import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { PricingSection } from "@/components/marketing/pricing-section";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { plans, trialDays } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: `PinitGrow monthly plans from $9.99. ${trialDays}-day free trial, no credit card.`,
};

export default function PricingPage() {
  const rows = plans[0]?.rows ?? [];

  return (
    <main>
      <Section className="pb-0">
        <Container>
          <SectionHeading
            kicker="Pricing"
            title="Start small. Scale when the data pays for itself."
            lead={`Every new account includes a ${trialDays}-day trial. Plans match the live app: Creator $9.99, Professional $29.99, Studio $85.99.`}
            className="mb-0"
          />
        </Container>
      </Section>
      <PricingSection showHeading={false} />
      <Section soft className="pt-16">
        <Container>
          <SectionHeading kicker="Compare" title="What each plan includes." />
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Capability</th>
                  {plans.map((plan) => (
                    <th key={plan.code} className="px-4 py-3 font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={row.label} className="border-t border-border">
                    <th className="px-4 py-3 font-medium">{row.label}</th>
                    {plans.map((plan) => (
                      <td key={plan.code} className="px-4 py-3 text-muted-foreground">
                        {plan.rows[rowIndex]?.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}
