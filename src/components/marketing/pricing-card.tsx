import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-border bg-card p-6",
        plan.featured && "border-primary",
      )}
    >
      {plan.featured ? <p className="mb-2 text-xs font-medium text-primary">Most popular</p> : null}
      <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
      <p className="mt-2 text-3xl font-semibold tracking-tight">
        {plan.priceLabel}
        <span className="text-sm font-normal text-muted-foreground">/mo</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{plan.pitch}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {plan.rows.map((row) => (
          <li key={row.label} className="flex justify-between gap-4 border-b border-border py-2">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-6" asChild>
        <AppLink path="/register">Start free trial</AppLink>
      </Button>
    </article>
  );
}
