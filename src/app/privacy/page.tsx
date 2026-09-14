import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PinitGrow collects, uses, and stores information on the marketing site and in the research app.",
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy Policy" updated="September 14, 2026">
      <p>
        This policy describes how {site.name} handles personal information and covers {site.url} and the research workspace at {site.appHost}.
        Questions: {site.email}.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account data you submit in the app, such as name, email, and password hashes.</li>
        <li>Research usage needed to operate quotas, saved lists, projects, and trackers.</li>
        <li>Billing data processed by our payment provider. We do not store full card numbers.</li>
        <li>Technical and diagnostic information used to operate the service, such as request and error logs.</li>
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
        We share necessary information with hosting, email, image-analysis and payment service providers to
        run the service. We do not sell personal information.
      </p>
      <h2>Contact form</h2>
      <p>When you send a message through our contact form, Web3Forms processes your name, email address, selected topic and message to deliver your enquiry to us. We use this information to respond and provide support.</p>
      <h2>Browser storage</h2>
      <p>The site and app use browser storage and session mechanisms for functions such as login, preferences and the current research workspace. Clearing browser storage can remove unsaved work or require you to sign in again.</p>
      <h2>Image analysis and payments</h2>
      <p>Creative image analysis sends selected public Pin images to an image-analysis provider to produce research observations. Where a purchase is processed by Paddle, it also handles transaction information under its <a className="text-link" href="https://www.paddle.com/legal/privacy">Privacy Policy</a>. Payment details should be entered only in the payment flow, not sent to support.</p>
      <h2>Retention and rights</h2>
      <p>
        Retention depends on the feature: temporary research can expire, while saved projects and lists persist with your account subject to product limits. We retain records as needed to provide the service and as required
        for billing or legal reasons. You may request access, correction, or deletion at{" "}
        {site.email}.
      </p>
      <h2>Questions and changes</h2>
      <p>For privacy questions or to make a request, email <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>. We may need to verify your identity before disclosing or deleting account information. We will update this page when our practices change.</p>
    </LegalPage>
  );
}
