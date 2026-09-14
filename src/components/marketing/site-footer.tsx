import Image from "next/image";
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card pt-14 pb-8">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Link href="/" className="inline-flex rounded-[var(--radius-control)]" aria-label="PinitGrow home">
              <Image
                src="/brand/pinitgrow-logo.svg"
                alt="PinitGrow"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[16.5rem] text-[13px] leading-relaxed text-muted-foreground">
              Pinterest research intelligence for creators, publishers, niche
              site owners, marketers and agencies.
            </p>
          </div>
          <FooterCol title="Product" links={footerNav.product} />
          <FooterCol title="Explore" links={footerNav.explore} />
          <FooterCol title="Company" links={footerNav.company} />
          <FooterCol title="Legal" links={footerNav.legal} />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Independent research software; not affiliated with or endorsed by Pinterest.</p>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-5 text-xs leading-relaxed text-[#7a756e] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            Pinterest research toolkit ·{" "}
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
              {site.email}
            </a>
            {" · "}
            <AppLink path="/login" className="transition-colors hover:text-foreground">
              Log in
            </AppLink>
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="mb-3 text-[13px] font-semibold">{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex min-h-8 items-center text-[13px] text-muted-foreground transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
