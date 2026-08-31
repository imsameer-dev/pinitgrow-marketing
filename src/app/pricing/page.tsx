import type { Metadata } from "next";
import { FaqList } from "@/components/marketing/faq-list";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Section } from "@/components/marketing/section";
import { plans, trialDays } from "@/lib/plans";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare PinitGrow plans and choose the Pinterest research capacity that fits your workflow.",
};

export default function PricingPage() {
  const billingFaqs = faqs.filter((item) =>
    /trial|app\?|happens when the trial/i.test(item.q),
  );

  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Choose the research capacity you need.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {trialDays}-day trial on every plan. No card. Daily limits reset on your timezone.
        </p>
      </Section>
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.code} plan={plan} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Full product access for 3 days, with the same tool set as paid plans. Limits apply.
          Checkout will open after production billing is approved; trial accounts work now.
        </p>
      </Section>
      <Section title="Compare">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Limit</th>
                {plans.map((plan) => (
                  <th key={plan.code} className="px-4 py-3 font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].rows.map((row, index) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="px-4 py-3 text-muted-foreground">{row.label}</td>
                  {plans.map((plan) => (
                    <td key={plan.code} className="px-4 py-3">
                      {plan.rows[index]?.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Billing">
        <FaqList items={billingFaqs} />
      </Section>
    </main>
  );
}
