"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CtaCardProps {
  children: React.ReactNode;
}

export function CtaCard({ children }: CtaCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Floating orbs — flare on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -left-20 -top-20 rounded-full bg-emerald-300/10 blur-[80px] animate-[orbFloat1_8s_ease-in-out_infinite] transition-all duration-700",
          hovered ? "h-96 w-96 bg-emerald-300/22" : "h-72 w-72",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-16 -right-16 rounded-full bg-gold-300/12 blur-[70px] animate-[orbFloat2_10s_ease-in-out_infinite] transition-all duration-700",
          hovered ? "h-88 w-88 bg-gold-300/24" : "h-64 w-64",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-300/8 blur-[60px] animate-[orbFloat1_12s_ease-in-out_infinite_reverse] transition-all duration-700",
          hovered ? "h-72 w-72 bg-azure-300/18" : "h-48 w-48",
        )}
      />

      {/* Animated border card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-px transition-all duration-500",
          hovered ? "-translate-y-1 shadow-[0_20px_60px_-10px_rgba(95,202,148,0.25),0_12px_36px_-8px_rgba(230,198,138,0.15)]" : "shadow-none",
        )}
        style={{
          background: "conic-gradient(from var(--border-angle), var(--emerald-300), var(--gold-300), var(--azure-300), var(--emerald-300))",
          animationName: "borderRotate",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDuration: hovered ? "1.5s" : "4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl px-6 py-10 backdrop-blur-sm transition-colors duration-500 sm:px-12 sm:py-14 lg:px-16 lg:py-16",
            hovered ? "bg-bg-950/85" : "bg-bg-950/92",
          )}
        >
          {/* Inner glow layers — intensify on hover */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-500",
              hovered ? "opacity-100" : "opacity-60",
            )}
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(95,202,148,0.18), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-500",
              hovered ? "opacity-100" : "opacity-60",
            )}
            style={{
              background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(230,198,138,0.14), transparent 60%)",
            }}
          />
          {/* Side glows that appear on hover */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-700",
              hovered ? "opacity-100" : "opacity-0",
            )}
            style={{
              background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(95,202,148,0.10), transparent 50%), radial-gradient(ellipse 40% 60% at 100% 50%, rgba(133,208,255,0.10), transparent 50%)",
            }}
          />

          <div className="relative text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
