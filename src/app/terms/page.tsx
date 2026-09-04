import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the PinitGrow marketing site and research workspace.",
};

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Service" updated="September 4, 2026">
      <p>
        By using {site.name} you agree to these terms. The product is a research
        workspace at {site.appHost}. This marketing site is informational.
      </p>
      <h2>Accounts</h2>
      <p>
        You must provide accurate registration details and keep your login secure. You are
        responsible for activity under your account.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Do not abuse rate limits, scrape our app, or attempt unauthorized access.</li>
        <li>Do not use the service for spam, deception, or anything illegal.</li>
        <li>Research results are for your internal content planning, not for resale as a raw data feed unless we agree in writing.</li>
      </ul>
      <h2>Plans and trials</h2>
      <p>
        Paid features are billed according to the plan you choose in the app. Trials are
        time-limited and may include usage caps. We may change plan limits with notice.
      </p>
      <h2>No official Pinterest affiliation</h2>
      <p>
        PinitGrow is an independent research tool. Pinterest is a trademark of its owner.
        Availability of public Pinterest data can change without notice.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        The service is provided as-is. We are not liable for lost profits, lost traffic, or
        ranking outcomes. Our liability is limited to fees you paid to us in the three
        months before a claim.
      </p>
      <p>Contact {site.email} for notices.</p>
    </LegalPage>
  );
}
