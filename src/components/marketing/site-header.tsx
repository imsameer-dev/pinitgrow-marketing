import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--page-max-width)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="PinitGrow home">
          <img
            src="/brand/pinitgrow-logo.svg"
            alt="PinitGrow"
            className="h-8 w-auto"
          />
        </Link>
        <nav className="ml-4 hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <AppLink path="/login">Log in</AppLink>
          </Button>
          <Button size="sm" asChild>
            <AppLink path="/register">Start free trial</AppLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
