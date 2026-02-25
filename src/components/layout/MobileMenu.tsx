"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavItems } from "@/data/nav";
import { cn } from "@/lib/utils/cn";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <details className="group relative">
      <summary className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-emerald-200/20 px-4 text-sm font-semibold text-mist-100 transition hover:border-emerald-200/45 hover:bg-emerald-950/45">
        Menu
      </summary>
      <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-emerald-200/20 bg-bg-900/95 p-2 shadow-[0_20px_45px_-25px_rgba(3,6,4,0.9)] backdrop-blur-md">
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                isActivePath(pathname, item.href)
                  ? "bg-emerald-950/80 text-emerald-100"
                  : "text-mist-200 hover:bg-emerald-950/70 hover:text-mist-50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </details>
  );
}
