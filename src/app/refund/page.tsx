import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { trialDays } from "@/lib/plans";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund & Cancellation Policy", description: "How to cancel PinitGrow, request a refund and get payment support." };

export default function RefundPage() {
  return (
    <LegalPage kicker="Legal" title="Refund & Cancellation Policy" updated="September 14, 2026">
      <p>Contact {site.name} at <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a> for product, cancellation or refund enquiries.</p>
      <h2>Try the service before paying</h2>
      <p>New accounts receive a {trialDays}-day trial with usage limits. No credit card is required. You are not automatically charged when the trial ends.</p>
      <h2>Cancel a subscription</h2>
      <p>Email support from your account email to request cancellation before your next renewal. For a purchase processed through Paddle, you can also use the subscription link in your payment receipt or visit <a className="text-link" href="https://paddle.net">Paddle buyer support</a>. Cancellation stops future renewal; access normally continues until the end of your paid period. Cancelling and requesting a refund are separate actions.</p>
      <h2>Request a refund</h2>
      <p>If you believe a charge is incorrect or the service was unavailable because of a fault on our side, contact us promptly, preferably within seven days of the charge. Include your account email, receipt reference, charge date and a description of the issue. We review requests individually; this is not an unconditional money-back guarantee. Do not send full payment card details or passwords.</p>
      <h2>Purchases through Paddle</h2>
      <p>Where your receipt identifies Paddle as the seller, its <a className="text-link" href="https://www.paddle.com/legal/refund-policy">Refund Policy</a> and <a className="text-link" href="https://www.paddle.com/legal/buyer-terms">Buyer Terms</a> govern the transaction. You may request payment assistance directly through Paddle. Eligibility, applicable deadlines and processing are determined under those terms and applicable law.</p>
      <h2>Your consumer rights</h2>
      <p>The seven-day contact preference above does not shorten statutory withdrawal or refund periods, or limit rights for faulty or misdescribed services. Mandatory consumer rights and any greater applicable protections remain in effect.</p>
      <h2>Payment concerns</h2>
      <p>We encourage you to contact support so we can investigate unexpected charges. This does not limit your right to contact your payment provider or exercise a lawful dispute right.</p>
    </LegalPage>
  );
}
