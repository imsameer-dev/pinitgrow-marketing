import { AppLink } from "@/components/marketing/app-link";
import { Container, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { plans, trialDays, trialLimits } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <Section id="pricing">
      <Container>
        {showHeading ? (
          <div className="mb-7 max-w-3xl">
            <p className="text-xs font-black tracking-[0.12em] text-primary uppercase">
              Pricing
            </p>
            <h2 className="mt-2.5 text-4xl font-semibold tracking-tight md:text-5xl">
              Start small. Scale when the data pays for itself.
            </h2>
          </div>
        ) : null}
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[20px] border border-border bg-card px-5 py-4 text-[13px] text-muted-foreground">
          <div className="border-border pr-5 md:border-r">
            <b className="block text-foreground">{trialDays}-day free trial</b>
            <span>No card required</span>
          </div>
          <span>{trialLimits.keyword_expand} keyword searches/day</span>
          <span>{trialLimits.annotation_explorer} idea searches/day</span>
          <span>{trialLimits.top_pins} Top Pins search/day</span>
          <span>Up to {trialLimits.max_pins_per_search} pins/search</span>
          <span>{trialLimits.research_project} project/day</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.code}
              className={cn(
                "relative flex flex-col rounded-[22px] border bg-card p-6",
                plan.featured
                  ? "border-2 border-primary shadow-[0_20px_60px_rgba(229,57,53,0.12)]"
                  : "border-border",
              )}
            >
              {plan.featured ? (
                <span className="absolute top-3.5 right-3.5 rounded-full bg-primary px-2.5 py-1.5 text-[10px] font-black text-primary-foreground">
                  MOST POPULAR
                </span>
              ) : null}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-3.5 text-[44px] leading-none font-black tracking-tight">
                {plan.priceLabel}{" "}
                <span className="text-sm font-semibold text-muted-foreground">
                  / month
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.pitch}</p>
              <ul className="mt-5 mb-5 grid flex-1">
                {plan.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex justify-between gap-4 border-b border-border py-2.5 text-[13px]"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <b className="text-right font-semibold text-foreground">{row.value}</b>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "default" : "secondary"}
                size="full"
                asChild
              >
                <AppLink path="/register">Start Free Trial</AppLink>
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
