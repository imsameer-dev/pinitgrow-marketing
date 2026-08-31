"use client";

import Link from "next/link";
import { useState } from "react";
import { AppLink } from "@/components/marketing/app-link";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="relative mx-auto flex h-[var(--header-height)] w-full max-w-[var(--page-max-width)] items-center gap-4 px-4 sm:px-6 lg:px-8">
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
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <AppLink path="/login">Log in</AppLink>
            </Button>
            <Button size="sm" asChild>
              <AppLink path="/register">Start free trial</AppLink>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </Button>
        </div>
        {menuOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-xl border border-border bg-card p-3 shadow-lg md:hidden"
          >
            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <AppLink
                path="/login"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                Log in
              </AppLink>
              <Button className="mt-2" asChild>
                <AppLink path="/register">Start free trial</AppLink>
              </Button>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
