import React from "react";
import { Fireflies } from "@/components/ui/Fireflies";

const QUOTE =
  "ForestlyGames is the most professional Roblox development group that I have worked with in my time on the platform. As a business associate and a casual player of many of the games that Forestly has put out, I can confidently say that the team has a strong commitment towards quality and customer satisfaction in all of its endeavors. The expertise that they have gained rivals that of professional game developers that I have worked with outside of the Roblox platform.";

const HIGHLIGHTS: { text: string; cls: string }[] = [
  { text: "most professional Roblox development group", cls: "font-semibold text-emerald-200" },
  { text: "strong commitment towards quality and customer satisfaction", cls: "font-semibold text-gold-300" },
  { text: "rivals that of professional game developers", cls: "font-semibold text-azure-300" },
];

function renderQuote(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = remaining.length;
    let match: (typeof HIGHLIGHTS)[number] | null = null;

    for (const h of HIGHLIGHTS) {
      const idx = remaining.indexOf(h.text);
      if (idx !== -1 && idx < earliest) {
        earliest = idx;
        match = h;
      }
    }

    if (!match) {
      parts.push(remaining);
      break;
    }

    if (earliest > 0) parts.push(remaining.slice(0, earliest));
    parts.push(
      <span key={key++} className={match.cls}>
        {match.text}
      </span>,
    );
    remaining = remaining.slice(earliest + match.text.length);
  }

  return parts;
}

export function FeaturedQuoteSection() {
  return (
    <section className="relative overflow-hidden border-y border-emerald-200/8 bg-bg-950">
      <Fireflies count={10} lgExtra={10} palette="emerald" />
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="text-center">
          <p className="inline-block rounded-full border border-gold-300/25 bg-gold-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-100">
            Industry Endorsement
          </p>

          <blockquote className="mt-6 sm:mt-8">
            <p className="text-base leading-relaxed text-mist-100/85 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
              &ldquo;{renderQuote(QUOTE)}&rdquo;
            </p>
          </blockquote>

          <div className="mt-6 sm:mt-8">
            <p className="text-sm font-semibold tracking-wide text-mist-50">
              Jessica
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-300/80">
              Producer at Electronic Arts (EA)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
