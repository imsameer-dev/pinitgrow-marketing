import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2 className="mb-8 text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
