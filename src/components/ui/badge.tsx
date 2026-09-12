import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[6px] px-2 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-success-soft text-success",
        outline: "border border-border bg-card text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
