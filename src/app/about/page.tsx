import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "PinitGrow is a cloud Pinterest research workspace for creators, publishers, and agencies.",
};

export default function AboutPage() {
  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading as="h1"
            kicker="Company"
            title="Research Pinterest like a system, not a guess."
            lead={`${site.name} helps creators, publishers, niche site owners, and agencies decide what to publish using public Pinterest demand, ranking, and creator signals.`}
          />
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>For product, billing or business enquiries about {site.name}, email <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
            <p>
              Most Pinterest research still lives in tabs, spreadsheets, and memory.
              PinitGrow puts keyword expansion, top-ranking pins, boards, accounts,
              trends, and rank tracking in one browser workspace.
            </p>
            <p>
              The public site is {site.url.replace("https://", "")}. The product is{" "}
              {site.appHost}. Trial signup and login happen in the app. Available payment options are shown when you choose a plan.
            </p>
            <p>
              We read publicly available logged-out Pinterest data. We do not claim an
              official Pinterest partnership.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
