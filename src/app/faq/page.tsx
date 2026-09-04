import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about the PinitGrow trial, exports, Pinterest data, and the research workspace.",
};

export default function FaqPage() {
  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            kicker="FAQ"
            title="Questions before you start?"
            lead="The marketing site is the front door. Research, billing, and login all happen in the app."
          />
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}
