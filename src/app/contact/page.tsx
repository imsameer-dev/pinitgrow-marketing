import type { Metadata } from "next";
import { AppLink } from "@/components/marketing/app-link";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact PinitGrow support at ${site.email}.`,
};

export default function ContactPage() {
  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            kicker="Support"
            title="We’re here if research gets stuck."
            lead={`Email ${site.email} for billing, trial, or product questions. Account access lives in the app.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">Email</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Typical replies during weekday business hours.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-sm font-semibold text-primary"
              >
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">Workspace</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Log in or start a trial on {site.appHost}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" asChild>
                  <AppLink path="/register">Start Free Trial</AppLink>
                </Button>
                <Button size="sm" variant="secondary" asChild>
                  <AppLink path="/login">Log in</AppLink>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
