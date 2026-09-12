"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMenuOpen(false); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); toggle.current?.focus(); } };
    const resize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("resize", resize);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", keyboard); window.removeEventListener("resize", resize); };
  }, [menuOpen]);
  return <header ref={header} className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }}>
    <Container className="relative flex h-[var(--header-height)] items-center justify-between gap-3">
      <Link href="/" className="brand-link flex shrink-0 items-center gap-2" aria-label="PinitGrow home" onClick={() => setMenuOpen(false)}>
        <span className="brand-symbol"><Image src="/brand/pinitgrow-logo.svg" alt="" width={60} height={42} preload /></span>
        <span className="text-[23px] font-semibold tracking-[-0.055em]">Pinit<span className="font-normal">Grow</span><span className="text-primary">.</span></span>
      </Link>
      <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted-foreground lg:flex" aria-label="Primary">{nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="py-3 transition-colors hover:text-primary aria-[current=page]:text-primary">{item.label}</Link>)}</nav>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" className="hidden lg:inline-flex" asChild><AppLink path="/login">Log in</AppLink></Button>
        <Button className="header-trial shrink-0 px-3 text-xs sm:px-4 sm:text-sm" asChild><AppLink path="/register">Start Free Trial <ArrowUpRight className="hidden sm:block" /></AppLink></Button>
        <Button ref={toggle} variant="ghost" className="px-2 lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span></Button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-lg border border-border bg-card p-3 shadow-md lg:hidden" onClick={() => setMenuOpen(false)}>
        {nav.map((item) => <Link key={item.href} href={item.href} className="flex min-h-12 items-center rounded-md px-3 text-sm font-medium hover:bg-muted">{item.label}</Link>)}
        <AppLink path="/login" className="flex min-h-12 items-center rounded-md border-t border-border px-3 text-sm font-medium hover:bg-muted">Log in</AppLink>
      </nav>}
    </Container>
  </header>;
}
