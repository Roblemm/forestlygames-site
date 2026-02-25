"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";

type FirefliesProps = {
  count?: number;
  /** Extra dots shown only on lg+ screens */
  lgExtra?: number;
  className?: string;
  palette?: "emerald" | "gold" | "mixed";
};

const COLORS = {
  emerald: "rgba(95,202,148,0.8)",
  gold: "rgba(230,198,138,0.8)",
  azure: "rgba(133,208,255,0.7)",
};

const GLOWS = {
  emerald: "0 0 6px 2px rgba(95,202,148,0.4), 0 0 14px 4px rgba(95,202,148,0.15)",
  gold: "0 0 6px 2px rgba(230,198,138,0.4), 0 0 14px 4px rgba(230,198,138,0.15)",
  azure: "0 0 6px 2px rgba(133,208,255,0.35), 0 0 14px 4px rgba(133,208,255,0.12)",
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function round(n: number, decimals: number) {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function buildDot(i: number, palette: "emerald" | "gold" | "mixed") {
  const r1 = seededRandom(i);
  const r2 = seededRandom(i + 100);
  const r3 = seededRandom(i + 200);
  const r4 = seededRandom(i + 300);
  const r5 = seededRandom(i + 400);

  let color: "emerald" | "gold" | "azure";
  if (palette === "mixed") {
    color = r5 < 0.55 ? "emerald" : r5 < 0.85 ? "gold" : "azure";
  } else {
    color = palette;
  }

  const size = round(2 + r3 * 2.5, 1);
  const floatDur = round(8 + r4 * 14, 1);
  const pulseDur = round(3 + r3 * 5, 1);
  const delay = round(r4 * -20, 1);

  return {
    left: `${round(r1 * 100, 2)}%`,
    top: `${round(r2 * 100, 2)}%`,
    size: `${size}px`,
    floatDur,
    pulseDur,
    delay,
    color: COLORS[color],
    glow: GLOWS[color],
  };
}

export function Fireflies({ count = 20, lgExtra = 0, className, palette = "mixed" }: FirefliesProps) {
  const total = count + lgExtra;

  const dots = useMemo(() => {
    return Array.from({ length: total }, (_, i) => buildDot(i, palette));
  }, [total, palette]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {dots.map((dot, i) => (
        <div
          key={i}
          className={cn("forest-firefly absolute rounded-full", i >= count && "hidden lg:block")}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            boxShadow: dot.glow,
            animation: `fireflyFloat ${dot.floatDur}s ease-in-out ${dot.delay}s infinite, fireflyPulse ${dot.pulseDur}s ease-in-out ${dot.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
