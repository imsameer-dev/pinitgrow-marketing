import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[color,background-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_26px_rgba(229,57,53,0.22)] hover:bg-primary-hover hover:-translate-y-px",
        secondary:
          "border border-[#dcd5cd] bg-card text-foreground hover:bg-muted hover:-translate-y-px",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:-translate-y-px",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        inverted:
          "bg-card text-[#b91f1b] hover:bg-white hover:-translate-y-px",
      },
      size: {
        default: "h-11 min-h-11 px-[18px]",
        sm: "h-9 min-h-9 px-3 text-sm",
        lg: "h-12 min-h-12 px-5",
        full: "h-11 min-h-11 w-full px-[18px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
