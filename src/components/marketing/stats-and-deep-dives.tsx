import { ProductShot } from "@/components/marketing/product-shot";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { deepDives, stats } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StatsAndDeepDives() {
  return (
    <Section>
      <Container>
        <SectionHeading
          kicker="Built for scale"
          title="Less manual research. More confident publishing."
        />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[20px] border border-border bg-card p-[22px]"
            >
              <b className="block text-[31px] tracking-tight">{stat.value}</b>
              <span className="text-[13px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-16 space-y-16">
          {deepDives.map((item, index) => (
            <div
              key={item.tag}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
            >
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <span className="inline-flex size-[34px] items-center justify-center rounded-[10px] bg-primary text-sm font-black text-primary-foreground">
                  {item.tag}
                </span>
                <h3 className="mt-3.5 text-[34px] leading-tight font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-muted-foreground">{item.body}</p>
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
