import Link from "next/link";
import {
  ProductShot,
  type ProductShotName,
} from "@/components/marketing/product-shot";
import { cn } from "@/lib/utils";

export function FeatureBlock({
  title,
  body,
  href,
  shot,
  shotUrl,
  imageLeft = false,
}: {
  title: string;
  body: string;
  href?: string;
  shot: ProductShotName;
  shotUrl: string;
  imageLeft?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className={cn(imageLeft && "md:order-2")}>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{body}</p>
        {href ? (
          <Link
            href={href}
            className="mt-4 inline-block text-sm font-medium text-primary"
          >
            See all features
          </Link>
        ) : null}
      </div>
      <div className={cn(imageLeft && "md:order-1")}>
        <ProductShot
          name={shot}
          alt={`Keyword Explorer interface (placeholder for ${title})`}
          url={shotUrl}
        />
      </div>
    </div>
  );
}
