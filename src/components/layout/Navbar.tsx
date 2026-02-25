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
        <Link href="/" aria-label={siteConfig.name} className="group inline-flex items-center gap-2.5">
          <Image
            src="/brand/mascot-smile.png"
            alt="ForestlyGames mascot"
            width={48}
            height={48}
            className="h-10 w-10 object-contain drop-shadow-[0_2px_8px_rgba(85,190,136,0.25)] transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11"
            priority
          />
          <span className="hidden font-display text-[0.95rem] font-bold uppercase tracking-[0.14em] text-mist-50 transition-colors duration-200 group-hover:text-emerald-200 sm:block">
            ForestlyGames
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-emerald-300/12 text-emerald-100"
                    : "text-mist-300 hover:bg-mist-50/6 hover:text-mist-50",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-emerald-300/80" />
                )}
              </Link>
            );
          })}
          <div className="ml-3">
            <LinkButton
              href="/contact"
              variant="secondary"
              className={cn(
                "border-azure-300/30 hover:border-azure-300/55 hover:bg-azure-300/8",
                isActivePath(pathname, "/contact") && "border-azure-300/85 bg-azure-500/22 text-mist-50",
              )}
            >
              Let&apos;s Talk
            </LinkButton>
          </div>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
