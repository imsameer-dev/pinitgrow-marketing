import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Section soft>
      <Container>
        <SectionHeading
          kicker="Social proof"
          title="Built for people who need Pinterest traffic to compound."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="rounded-[20px] border border-border bg-card p-[22px]"
            >
              <div className="tracking-[2px] text-[#f0aa2e]" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p className="mt-3 min-h-[90px] text-[15px] text-[#4f4a45]">
                “{item.quote}”
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <div
                  className="size-[38px] rounded-full bg-gradient-to-br from-[#d7b29f] to-[#6f5042]"
                  aria-hidden
                />
                <div>
                  <strong className="block text-sm">{item.name}</strong>
                  <small className="text-[#8a847d]">{item.role}</small>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  );
}
