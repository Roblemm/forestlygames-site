import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { primaryNavItems } from "@/data/nav";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-300/10 bg-bg-950/90">
      <Container className="grid gap-8 py-10 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-2">
          <p className="font-display text-xl text-mist-50">ForestlyGames</p>
          <p className="max-w-md text-sm leading-6 text-mist-200/75">
            A premium studio showcase focused on game discovery, studio identity, and clear contact paths.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {primaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-mist-200 transition hover:text-emerald-200">
              {item.label}
            </Link>
          ))}
          <Link href="mailto:hello@forestlygames.com" className="text-mist-200 transition hover:text-gold-100">
            Email
          </Link>
        </div>
      </Container>
    </footer>
  );
}
