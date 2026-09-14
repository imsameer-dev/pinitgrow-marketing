import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, BookOpen, LayoutDashboard } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { ContactForm } from "@/components/marketing/contact-form";
import { Container, Section } from "@/components/marketing/section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: `Get help with PinitGrow research, your account or billing. Send a message or email ${site.email}.` };

export default function ContactPage() {
  return (
    <main>
      <Section className="py-12 md:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:pt-5">
              <p className="eyebrow">LET’S TALK</p>
              <h1 className="mt-5 max-w-lg text-4xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">Good research.<br /><span className="text-primary">Better support.</span></h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">From your first keyword to your next content plan, we’re here to help. Tell us what you’re working on and where you need a hand.</p>
              <div className="mt-9 rounded-xl border border-border bg-surface-subtle p-6">
                <Mail className="mb-4 size-5 text-primary" aria-hidden="true" />
                <h2 className="text-base font-semibold">Prefer email?</h2>
                <a className="mt-2 inline-flex items-center gap-2 break-all text-base font-medium text-primary hover:underline" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></a>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Product questions, account help, billing and feedback—all welcome.</p>
              </div>
              <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">Already using PinitGrow? A short description of the page or feature you’re using helps us understand your question.</p>
            </div>
            <ContactForm />
          </div>
          <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            <Link href="/faq" className="group flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:bg-muted">
              <BookOpen className="size-5 shrink-0 text-primary" aria-hidden="true" /><div className="flex-1"><h2 className="text-sm font-semibold">A quick answer might be here</h2><p className="mt-1 text-sm text-muted-foreground">Explore common questions about PinitGrow.</p></div><ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <AppLink path="/login" className="group flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:bg-muted">
              <LayoutDashboard className="size-5 shrink-0 text-primary" aria-hidden="true" /><div className="flex-1"><h2 className="text-sm font-semibold">Back to your workspace</h2><p className="mt-1 text-sm text-muted-foreground">Pick up your research where you left off.</p></div><ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </AppLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
