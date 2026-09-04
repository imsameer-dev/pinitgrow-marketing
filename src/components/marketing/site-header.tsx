"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <Container className="relative flex h-[var(--header-height)] items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="PinitGrow home">
          <Image
            src="/brand/pinitgrow-logo.svg"
            alt="PinitGrow"
            width={200}
            height={56}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#494540] lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden lg:inline-flex" asChild>
            <AppLink path="/login">Log in</AppLink>
          </Button>
          <Button className="hidden sm:inline-flex" asChild>
            <AppLink path="/register">Start Free Trial</AppLink>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
        {menuOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-2xl border border-border bg-card p-3 shadow-lg lg:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <AppLink
              path="/login"
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-muted"
            >
              Log in
            </AppLink>
            <Button className="mt-2 w-full" asChild>
              <AppLink path="/register">Start Free Trial</AppLink>
            </Button>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
