import Image from "next/image";
import { cn } from "@/lib/utils";

export const productShots = {
  keywords: {
    src: "/product/keyword-explorer-live.png",
    alt: "PinitGrow Keyword Explorer showing A–Z suggestions, intent, and popularity scores",
    width: 1600,
    height: 1000,
  },
  "keywords-light": {
    src: "/product/keywords-light.png",
    alt: "Keyword Explorer in light mode with 364 suggestions and popularity bars",
    width: 1600,
    height: 1000,
  },
  ideas: {
    src: "/product/ideas-live.png",
    alt: "Ideas tool listing Pinterest-native topics, search volume, and relevance",
    width: 1600,
    height: 1000,
  },
  "top-pins": {
    src: "/product/top-pins-live.webp",
    alt: "Top Pins results grid with ranking badges and match confidence",
    width: 1600,
    height: 1000,
  },
  trends: {
    src: "/product/trends-live.png",
    alt: "Trends workspace showing spotlight topics and save-based momentum",
    width: 1600,
    height: 1000,
  },
} as const;

export type ProductShotName = keyof typeof productShots | "placeholder";

export function ProductFrame({
  title = "Keyword Explorer",
  caption = "PinitGrow Studio",
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
        "overflow-hidden rounded-[28px] bg-gradient-to-b from-[#171717] to-[#222] p-3.5 shadow-device",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[18px] border border-device-border bg-device">
        <div className="flex h-[52px] items-center justify-between border-b border-[#2b2d30] px-[18px]">
          <strong className="text-[13px] text-device-foreground">{title}</strong>
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
  priority = false,
  className,
}: {
  name: ProductShotName;
  title?: string;
  badge?: string;
  priority?: boolean;
  className?: string;
}) {
  const shot = name === "placeholder" ? null : productShots[name];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-[18px] shadow-lg",
        className,
      )}
    >
      {title ? (
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <strong className="text-[13px]">{title}</strong>
          {badge ? (
            <span className="rounded-full bg-success-soft px-2 py-1 text-[10px] font-extrabold text-success">
              {badge}
            </span>
          ) : null}
        </div>
      ) : null}
      {shot ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      ) : (
        <ImageSlot label={title ?? "Product screenshot"} />
      )}
    </div>
  );
}

export function ImageSlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted px-6 py-16 text-center">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Add a screenshot to <code>public/product/</code> to replace this slot.
        </p>
      </div>
    </div>
  );
}
