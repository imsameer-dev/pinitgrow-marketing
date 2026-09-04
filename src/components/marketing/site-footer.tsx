import Image from "next/image";
import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="resources" className="pt-12 pb-8">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="inline-flex" aria-label="PinitGrow home">
              <Image
                src="/brand/pinitgrow-logo.svg"
                alt="PinitGrow"
                width={180}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <p className="footer-copy mt-4 max-w-[260px] text-[13px] text-muted-foreground">
              Pinterest research intelligence for creators, publishers, niche
              site owners, marketers and agencies.
            </p>
          </div>
          <FooterCol title="Product" links={footerNav.product} />
          <FooterCol title="Explore" links={footerNav.explore} />
          <FooterCol title="Company" links={footerNav.company} />
          <FooterCol title="Legal" links={footerNav.legal} />
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-border pt-4 text-xs text-[#8b857e] sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            Pinterest research toolkit ·{" "}
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            {" · "}
            <AppLink path="/login" className="hover:text-foreground">
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
      <h4 className="mb-3 text-[13px] font-semibold">{title}</h4>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="my-1.5 block text-[13px] text-muted-foreground hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
