import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <Section soft>
      <Container>
        <SectionHeading
          kicker="Three steps"
          title="From seed keyword to content decision in minutes."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-[22px] border border-border bg-card p-6"
            >
              <div className="mb-4 grid size-9 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                {step.num}
              </div>
              <h3 className="text-[19px] font-semibold">{step.title}</h3>
              <p className="mt-2 mb-4 text-sm text-muted-foreground">{step.body}</p>
              <div className="rounded-[14px] border border-[#eee8e2] bg-[#fcfbfa] p-3">
                <div className="my-1.5 h-2 w-4/5 rounded-full bg-[#f7c4c2]" />
                <div className="my-1.5 h-2 w-1/2 rounded-full bg-[#e9e5e0]" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
