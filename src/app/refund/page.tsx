import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { trialDays } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "PinitGrow refund and trial terms.",
};

export default function RefundPage() {
  return (
    <LegalPage kicker="Legal" title="Refund Policy" updated="September 4, 2026">
      <p>
        Every new account includes a {trialDays}-day trial so you can test the workspace
        before paying. No credit card is required to start the trial.
      </p>
      <h2>Monthly subscriptions</h2>
      <p>
        You can cancel anytime from the app. Cancellation stops the next renewal. The
        current period generally remains available until it ends.
      </p>
      <h2>Refunds</h2>
      <p>
        If a charge was made in error, or the product was unavailable due to a fault on
        our side, email {site.email} within 7 days of the charge. We review refund
        requests individually.
      </p>
      <h2>Chargebacks</h2>
      <p>
        Please contact support before filing a dispute so we can help faster. Repeated
        chargebacks may result in account closure.
      </p>
    </LegalPage>
  );
}
