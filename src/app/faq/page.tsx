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
      <Section className="py-12 md:py-16">
        <Container className="max-w-[760px]">
          <SectionHeading as="h1"
            kicker="FAQ"
            title="Questions before you start?"
            lead="Get to know the research tools, trial, and plans before you get started."
            className="mb-8"
          />
          <Accordion type="single" collapsible className="rounded-[16px] border border-border bg-card px-4 shadow-xs sm:px-5">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
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
