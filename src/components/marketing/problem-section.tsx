import { Check, HelpCircle, TrendingDown, TrendingUp } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { problems } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  problem: [HelpCircle, TrendingDown],
  solution: [Check, TrendingUp],
};

export function ProblemSection() {
  return (
    <Section id="usecases" soft>
      <Container>
        <SectionHeading
          kicker="The problem"
          title="Pinterest research is scattered. Your decisions shouldn’t be."
          lead="Most marketers jump between Pinterest search, spreadsheets, trend tools, random boards, and manual pin checking. PinitGrow turns that mess into one decision system."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {problems.map((item, index) => {
            const Icon = icons[item.kind][index < 2 ? 0 : 1];
            return (
              <div key={item.title} className="surface-card flex items-start gap-4 p-6">
                <div
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-[10px]",
                    item.kind === "problem"
                      ? "bg-[#fff0ef] text-primary"
                      : "bg-success-soft text-success",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg leading-snug font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
