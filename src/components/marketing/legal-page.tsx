import { Container, Section } from "@/components/marketing/section";

export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-xs font-black tracking-[0.12em] text-primary uppercase">
            {kicker}
          </p>
          <h1 className="mt-2.5 text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
          <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            {children}
          </div>
        </Container>
      </Section>
    </main>
  );
}
