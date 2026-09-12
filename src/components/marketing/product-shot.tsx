import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getProductShot,
  productShots,
  type ProductShotName,
} from "@/lib/product-shots";

export { productShots };
export type { ProductShotName };

export function ProductFrame({
  title = "Keyword Explorer",
  caption = "PinitGrow",
  className,
  children,
}: {
  title?: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[20px] bg-[#161616] p-2 shadow-device md:p-2.5",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[12px] border border-device-border bg-device">
        <div className="flex h-10 items-center justify-between border-b border-[#2b2d30] px-4">
          <strong className="text-[12px] font-medium text-device-foreground">{title}</strong>
          <span className="text-[11px] text-device-muted">{caption}</span>
        </div>
        {children}
      </div>
    </figure>
  );
}

export function ProductShot({
  name,
  title,
  badge,
  preload = false,
  sizes = "(min-width: 1024px) 540px, 100vw",
  className,
}: {
  name: ProductShotName;
  title?: string;
  badge?: string;
  preload?: boolean;
  sizes?: string;
  className?: string;
}) {
  const shot = getProductShot(name);

  return (
    <figure className={cn("screenshot-frame", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-3.5 py-2.5">
          <strong className="text-[13px] font-medium">{title}</strong>
          {badge ? (
            <span className="rounded-md bg-success-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-success uppercase">
              {badge}
            </span>
          ) : null}
        </div>
      ) : null}
      {shot ? (
        <div className="relative w-full" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            preload={preload}
            sizes={sizes}
            className="object-cover object-left-top"
          />
        </div>
      ) : (
        <ImageSlot label={title ?? "Product screenshot"} />
      )}
    </figure>
  );
}

export function ImageSlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center bg-muted px-6 py-16 text-center">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Add a screenshot to <code>public/product/</code> to replace this slot.
        </p>
      </div>
    </div>
  );
}
