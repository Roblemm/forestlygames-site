import Link from "next/link";

import { primaryNavItems } from "@/data/nav";

export function MobileMenu() {
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
              className="rounded-lg px-3 py-2 text-sm font-medium text-mist-200 transition hover:bg-emerald-950/70 hover:text-mist-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </details>
  );
}
