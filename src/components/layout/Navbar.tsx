import Link from "next/link";

import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { primaryNavItems } from "@/data/nav";
import { siteConfig } from "@/data/site";

import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-300/10 bg-bg-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-xl tracking-wide text-mist-50">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-mist-200 transition hover:text-emerald-200"
            >
              {item.label}
            </Link>
          ))}
          <LinkButton href="/contact" variant="secondary">
            Let&apos;s Talk
          </LinkButton>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
