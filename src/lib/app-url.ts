import { site } from "@/lib/site";

export function appUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || `https://${site.appHost}`;
  const origin = base.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${suffix}`;
}
