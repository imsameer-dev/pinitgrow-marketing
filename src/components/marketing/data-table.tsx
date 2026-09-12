import { cn } from "@/lib/utils";

export function DataTable({
  caption,
  className,
  children,
}: {
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground md:hidden">
        Swipe sideways to see every column.
      </p>
      <div className={cn("table-frame", className)}>
        <table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          {children}
        </table>
      </div>
    </div>
  );
}
