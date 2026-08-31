import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-muted-foreground">
          PinitGrow — Pinterest research in the browser.
        </p>
        <nav className="flex flex-wrap gap-4 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <AppLink
            path="/login"
            className="text-muted-foreground hover:text-foreground"
          >
            Log in
          </AppLink>
          <AppLink
            path="/register"
            className="text-muted-foreground hover:text-foreground"
          >
            Start free trial
          </AppLink>
        </nav>
      </div>
    </footer>
  );
}
