import { cn } from "@/lib/utils";

export function Decision({
  question,
  className,
}: {
  question: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-border-subtle pt-4", className)}>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Decision
      </p>
      <p className="mt-1.5 text-[15px] leading-snug font-medium text-foreground">{question}</p>
    </div>
  );
}
