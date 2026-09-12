import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--content-max-width)] px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  soft = false,
  children,
}: {
  id?: string;
  className?: string;
  soft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        soft && "border-y border-[#eee8e2] bg-surface-subtle",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  className,
  as: Heading = "h2",
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <p className="text-xs font-black tracking-[0.12em] text-primary uppercase">
        {kicker}
      </p>
      <Heading className="mt-3 text-3xl leading-[1.12] font-semibold tracking-[-0.04em] md:text-5xl">
        {title}
      </Heading>
      {lead ? (
        <p className="lead mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
