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
        "py-24",
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
}: {
  kicker: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <p className="text-xs font-black tracking-[0.12em] text-primary uppercase">
        {kicker}
      </p>
      <h2 className="mt-2.5 text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="lead mt-4 max-w-3xl text-lg text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
