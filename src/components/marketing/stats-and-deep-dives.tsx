import { ProductShot } from "@/components/marketing/product-shot";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { deepDives, stats } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StatsAndDeepDives() {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <SectionHeading
          kicker="Built for scale"
          title="Less manual research. More confident publishing."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="surface-card p-5">
              <b className="block text-[28px] leading-none tracking-tight">{stat.value}</b>
              <span className="mt-2 block text-[13px] leading-snug text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
          {deepDives.map((item, index) => (
            <div
              key={item.tag}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <span className="inline-flex size-8 items-center justify-center rounded-[8px] bg-primary text-[13px] font-semibold text-primary-foreground">
                  {item.tag}
                </span>
                <h3 className="mt-3 max-w-[20ch] text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.15] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[38rem] text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {item.body}
                </p>
              </div>
              <ProductShot
                name={item.shot}
                title={item.caption}
                badge={item.badge}
                className={cn(index % 2 === 1 && "lg:order-1")}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
