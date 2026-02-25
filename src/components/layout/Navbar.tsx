"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { primaryNavItems } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils/cn";

import { MobileMenu } from "./MobileMenu";

const SCROLL_DELTA_TRIGGER = 6;
const TOP_SHOW_OFFSET = 24;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= TOP_SHOW_OFFSET) {
        setIsHidden(false);
        lastY = currentY;
        return;
      }

      const delta = currentY - lastY;

      if (delta > SCROLL_DELTA_TRIGGER) {
        setIsHidden(true);
      } else if (delta < -SCROLL_DELTA_TRIGGER) {
        setIsHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-emerald-300/10 bg-bg-950/80 backdrop-blur-xl transition-transform duration-300 will-change-transform",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={siteConfig.name} className="inline-flex items-center gap-3">
          <Image
            src="/brand/mascot-smile.png"
            alt="ForestlyGames mascot"
            width={48}
            height={48}
            className="h-11 w-11 object-contain drop-shadow-[0_2px_8px_rgba(85,190,136,0.3)] sm:h-12 sm:w-12"
            priority
          />
          <Image
            src="/brand/fg-logo.png"
            alt="ForestlyGames"
            width={140}
            height={48}
            className="hidden h-9 w-auto object-contain sm:block"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition",
                isActivePath(pathname, item.href) ? "text-emerald-100" : "text-mist-200 hover:text-emerald-200",
              )}
            >
              {item.label}
            </Link>
          ))}
          <LinkButton
            href="/contact"
            variant="secondary"
            className={cn(
              "border-azure-300/30 hover:border-azure-300/55",
              isActivePath(pathname, "/contact") && "border-azure-300/85 bg-azure-500/22 text-mist-50",
            )}
          >
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
