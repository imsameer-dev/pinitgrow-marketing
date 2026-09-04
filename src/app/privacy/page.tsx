import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PinitGrow collects, uses, and stores information on the marketing site and in the research app.",
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy Policy" updated="September 4, 2026">
      <p>
        This policy covers {site.url} and the research workspace at {site.appHost}.
        Questions: {site.email}.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account data you submit in the app, such as name, email, and password hashes.</li>
        <li>Research usage needed to operate quotas, saved lists, projects, and trackers.</li>
        <li>Billing data processed by our payment provider. We do not store full card numbers.</li>
        <li>Basic site analytics and diagnostics, such as pages visited and error logs.</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use this information to provide the product, authenticate users, enforce plan
        limits, send transactional email, improve reliability, and comply with law.
      </p>
      <h2>Pinterest data</h2>
      <p>
        PinitGrow researches publicly available logged-out Pinterest pages. We do not
        claim an official Pinterest partnership and we do not sell your private Pinterest
        credentials.
      </p>
      <h2>Sharing</h2>
      <p>
        We share data with infrastructure, email, and payment processors only as needed to
        run the service. We do not sell personal information.
      </p>
      <h2>Retention and rights</h2>
      <p>
        We keep account and research records while your account is active and as required
        for billing or legal reasons. You may request access, correction, or deletion at{" "}
        {site.email}.
      </p>
    </LegalPage>
  );
}
