import { cn } from "@/lib/utils";

export function SafariFrame({
  children,
  url = "app.pinitgrow.com/app/keywords",
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-md", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-muted">{children}</div>
    </figure>
  );
}
