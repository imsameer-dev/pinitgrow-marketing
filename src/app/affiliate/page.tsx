import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description: "Partner with PinitGrow and refer creators, publishers, and agencies.",
};

export default function AffiliatePage() {
  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            kicker="Partners"
            title="Refer Pinterest operators who need a real research stack."
            lead="If you teach Pinterest, run an agency, or publish for creators, you can refer PinitGrow. Program details are handled over email while we finish the partner portal."
          />
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Send your audience, site, and expected volume to {site.email} with the
              subject “Affiliate”. We’ll reply with commission terms if it’s a fit.
            </p>
            <Button className="mt-5" asChild>
              <a href={`mailto:${site.email}?subject=Affiliate%20program`}>
                Email {site.email}
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
