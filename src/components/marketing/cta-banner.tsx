import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";
import { trialDays } from "@/lib/plans";

export function CtaBanner() {
  return (
    <section className="px-4 pb-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto overflow-hidden rounded-[28px] bg-linear-to-br from-[#d92f2b] to-[#f14d48] px-6 py-14 text-center text-white md:px-12 md:py-[58px] max-w-[var(--content-max-width)]">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Research Pinterest like you intend to win.
        </h2>
        <p className="mx-auto mt-4 mb-6 max-w-[650px] text-[17px] text-[#ffecea]">
          Find better keywords. Understand what ranks. Track what moves. Build
          content around evidence instead of intuition.
        </p>
        <Button variant="inverted" size="lg" asChild>
          <AppLink path="/register">
            Start Your {trialDays}-Day Free Trial
            <ArrowRight className="size-4" />
          </AppLink>
        </Button>
      </div>
    </section>
  );
}
