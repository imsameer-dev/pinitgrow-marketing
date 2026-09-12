import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Section soft className="py-20 md:py-24">
      <Container>
        <SectionHeading
          kicker="Social proof"
          title="Built for people who need Pinterest traffic to compound."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => {
            const initials = item.name
              .split(" ")
              .map((part) => part[0])
              .join("");
            return (
              <blockquote key={item.name} className="surface-card flex h-full flex-col p-6">
                <p className="text-[15px] leading-relaxed text-[#4f4a45]">“{item.quote}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span
                    className="grid size-9 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground"
                    aria-hidden
                  >
                    {initials}
                  </span>
                  <div>
                    <strong className="block text-sm font-semibold">{item.name}</strong>
                    <span className="text-[13px] text-muted-foreground">{item.role}</span>
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
