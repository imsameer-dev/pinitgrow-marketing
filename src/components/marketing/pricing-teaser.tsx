import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingTeaser() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.code}
            className={cn(
              "flex flex-col rounded-xl border border-border bg-card p-6",
              plan.featured && "border-primary",
            )}
          >
            {plan.featured ? (
              <p className="mb-2 text-xs font-medium text-primary">
                Most popular
              </p>
            ) : null}
            <h3 className="text-base font-semibold">{plan.name}</h3>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {plan.priceLabel}
              <span className="text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.pitch}</p>
            <Button className="mt-6" asChild>
              <AppLink path="/register">Start free trial</AppLink>
            </Button>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/pricing" className="font-medium text-primary">
          Compare plans
        </Link>
      </p>
    </div>
  );
}
