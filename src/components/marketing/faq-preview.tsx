import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { homeFaqs } from "@/lib/site";

export function FaqPreview() {
  return (
    <Section soft>
      <Container>
        <SectionHeading kicker="FAQ" title="Questions before you start?" />
        <div className="grid gap-3 md:grid-cols-2">
          {homeFaqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-border bg-card px-5 py-[18px]"
            >
              <strong className="text-sm">{item.q}</strong>
              <p className="mt-2.5 text-[13px] text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
