"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SafariFrame } from "@/components/marketing/safari-frame";

export type ProductShotName = "keywords";

export const productShots: Record<ProductShotName, { light: string; dark?: string }> = {
  keywords: { light: "/product/keywords-light.png" },
};

const alts: Record<ProductShotName, string> = {
  keywords: "PinitGrow Keyword Explorer with an A–Z suggestion table and popularity scores",
};

export function ProductShot({
  name,
  alt,
  priority = false,
  url,
}: {
  name: ProductShotName;
  alt?: string;
  priority?: boolean;
  url?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const shot = productShots[name];
  const src = theme === "dark" && shot.dark ? shot.dark : shot.light;

  return (
    <SafariFrame url={url}>
      <Image
        src={src}
        alt={alt ?? alts[name]}
        width={1440}
        height={900}
        priority={priority}
        className="h-auto w-full"
      />
    </SafariFrame>
  );
}
