import Link from "next/link";
import Image from "next/image";

import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { primaryNavItems } from "@/data/nav";
import { siteConfig } from "@/data/site";

import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-300/10 bg-bg-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={siteConfig.name} className="inline-flex items-center">
          <Image src="/brand/fg-logo.png" alt="ForestlyGames logo" width={220} height={220} className="h-9 w-auto" priority />
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
          <LinkButton href="/contact" variant="secondary" className="border-azure-300/30 hover:border-azure-300/55">
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
