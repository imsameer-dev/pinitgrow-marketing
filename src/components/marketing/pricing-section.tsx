import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { Container, Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { plans, trialDays, trialLimits } from "@/lib/plans";
import { cn } from "@/lib/utils";

const summaryRows = ["Keyword Explorer", "Top Pins credits", "Maximum pins/search", "Stored projects", "Project image analysis", "Tracker history"];

export function PricingSection({ showHeading = true }: { showHeading?: boolean }) {
  return <Section id="pricing"><Container>
    {showHeading && <div className="pricing-heading"><p className="eyebrow">ROOM TO START. ROOM TO GROW.</p><h2>A clear plan for your next chapter.</h2><p>Start with a {trialDays}-day free trial. Choose the research capacity that fits your work.</p></div>}
    <div className="grid items-stretch gap-4 lg:grid-cols-3">
      {plans.map((plan) => <article key={plan.code} className={cn("pricing-plan relative flex flex-col border border-border bg-card", plan.featured && "pricing-plan-featured")}>
        <div className="flex items-center justify-between gap-2"><h3 className="text-lg font-semibold">{plan.name}</h3>{plan.featured && <span className="rounded-sm bg-foreground px-2 py-1 text-[10px] font-medium text-white">Best value · 3× capacity</span>}</div>
        <p className="mt-3 min-h-10 text-sm leading-relaxed text-muted-foreground">{plan.pitch}</p>
        <div className="mt-6 mb-1 text-[44px] leading-none font-medium tracking-[-0.05em]">{plan.priceLabel}<span className="ml-2 text-sm font-normal tracking-normal text-muted-foreground">/ month</span></div>
        <p className="mb-6 mt-2 text-xs text-muted-foreground">USD · per month</p>
        <Button size="full" variant={plan.featured ? "default" : "secondary"} asChild><AppLink path="/register">Start Free Trial <ArrowRight /></AppLink></Button>
        <p className="mt-7 border-b border-border pb-3 text-xs font-semibold">Your daily research capacity</p>
        <ul className="mt-1 flex-1">{plan.rows.filter((row) => summaryRows.includes(row.label)).map((row) => <li key={row.label} className="flex justify-between gap-3 py-2.5 text-xs"><span className="text-muted-foreground">{row.label}</span><strong className="font-medium">{row.value}</strong></li>)}</ul>
      </article>)}
    </div>
    <div className="pricing-trial"><p>Daily credits reset at 00:00 UTC and do not roll over. One Top Pins credit covers up to 100 pins; larger fresh searches use 2–5 credits. Pin statistics, idea measurements and project image analysis are included without separate daily quotas. There is no active-tracker cap. Daily automatic checks are included; manual rank and search checks use their plan allowances. CSV exports and cached research are unlimited. All plans are single-login workspaces; shared team seats are not included.</p><p>{trialDays} days to explore with trial usage limits. No credit card required and no automatic charge when the trial ends. Choose and pay for a plan to continue research. Monthly subscriptions renew until cancelled; any applicable taxes and the final total are shown before payment.</p><details><summary>What’s included in the free trial?</summary><p>{trialLimits.keyword_expand} keyword searches, {trialLimits.annotation_explorer} idea searches, {trialLimits.top_pins} Top Pins search, and {trialLimits.research_project} research project per day. Up to {trialLimits.max_pins_per_search} pins per search. Trial usage limits apply.</p></details><p>Available payment options are shown in the app. If checkout is unavailable, contact support to discuss plan activation. For cancellation or billing help, email <a className="text-link" href="mailto:support@pinitgrow.com">support@pinitgrow.com</a>.</p><p><Link className="text-link" href="/terms">Terms of Service</Link> · <Link className="text-link" href="/refund">Refund & cancellation policy</Link> · <Link className="text-link" href="/privacy">Privacy Policy</Link></p>{showHeading && <Link href="/pricing#compare" className="text-link">Compare every plan detail <ArrowRight /></Link>}</div>
  </Container></Section>;
}
