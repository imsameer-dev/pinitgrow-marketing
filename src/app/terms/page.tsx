import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { trialDays } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service", description: "PinitGrow business identity, software access, subscription and usage terms." };

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Service" updated="September 14, 2026">
      <p>These terms govern your use of {site.name} and cover {site.url} and the research app at {site.appHost}. For notices and support, email <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>The service</h2>
      <p>PinitGrow provides online software for Pinterest keyword research, Pin comparisons, saved research projects, lists and tracking. Your purchase provides access to the software and the capacity shown on our <Link className="text-link" href="/pricing">pricing page</Link>. It does not transfer ownership of Pinterest images or other third-party content.</p>
      <h2>Accounts and permitted use</h2>
      <p>Keep your registration details accurate and your login secure. Plans provide one login; shared team seats are not included. You may use the workspace for your own or your clients’ content research within the published limits.</p>
      <ul>
        <li>Do not bypass usage limits, interfere with the service or attempt unauthorized access.</li>
        <li>Do not use the service for spam, deception, infringement or unlawful activity.</li>
        <li>Do not resell results as a raw data feed without our written agreement.</li>
        <li>Use third-party images and content only when you have the necessary rights or permission.</li>
      </ul>
      <h2>Free trial</h2>
      <p>New accounts receive a {trialDays}-day trial with the limits listed on the pricing page. No credit card is required and trial expiry does not automatically charge you. Continuing to use research tools after expiry requires an active paid plan.</p>
      <h2>Prices, payment and access</h2>
      <p>Prices are listed in USD per month. The payment flow or agreed order identifies the plan, billing period, applicable taxes and final amount before payment. Available payment options are shown in the app; if checkout is unavailable, contact support about activation. Paid access is provided to your PinitGrow account once payment and activation are confirmed.</p>
      <p>Monthly recurring subscriptions renew until cancelled. Any manually arranged fixed access period follows the terms agreed before payment. We will communicate changes to your plan price or limits before they take effect.</p>
      <p>For purchases processed through Paddle, Paddle acts as the merchant of record and its <a className="text-link" href="https://www.paddle.com/legal/buyer-terms">Buyer Terms</a> apply to the payment transaction. PinitGrow remains responsible for product support.</p>
      <h2>Cancellation and refunds</h2>
      <p>You may request cancellation by emailing {site.email}. For Paddle purchases, you can also use the subscription-management link in your receipt. Cancellation stops future renewal and normally leaves access until the paid period ends. Cancellation does not itself refund a previous payment. See our <Link className="text-link" href="/refund">Refund &amp; cancellation policy</Link>.</p>
      <h2>Data, availability and outcomes</h2>
      <p>We use public Pinterest data, which may be incomplete, delayed or unavailable. Scores and creative comparisons support research; they do not guarantee traffic, revenue or search rankings. PinitGrow is independent of Pinterest and is not endorsed by it. Our <Link className="text-link" href="/privacy">Privacy Policy</Link> explains how we handle information.</p>
      <h2>Suspension and responsibility</h2>
      <p>We may restrict access for nonpayment, misuse or security reasons. The service is provided as available. To the extent permitted by law, we are not responsible for indirect losses or lost profits, and our total liability is limited to the fees you paid for the service during the three months before the claim. Nothing in these terms excludes liability or consumer rights that cannot lawfully be excluded.</p>
      <h2>Changes and contact</h2>
      <p>We may update these terms and will communicate material changes affecting existing customers. The date above identifies this version. Contact {site.email} with questions about your account or these terms.</p>
    </LegalPage>
  );
}
