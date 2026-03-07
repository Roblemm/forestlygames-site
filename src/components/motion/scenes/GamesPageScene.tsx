"use client";

import type { ReactNode } from "react";

import { Fireflies } from "@/components/ui/Fireflies";
import { cn } from "@/lib/utils/cn";

type GamesPageSceneProps = {
  children: ReactNode;
  className?: string;
};

export function GamesPageScene({ children, className }: GamesPageSceneProps) {
  return (
    <div className={cn("relative min-h-screen overflow-x-clip bg-bg-900", className)}>
      {/* Layered radial gradients (emerald, gold, azure) — same language as GamesShowcaseScene */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(81,176,133,0.18),transparent_42%),radial-gradient(circle_at_82%_78%,rgba(200,151,73,0.14),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(121,201,255,0.08),transparent_35%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(5,11,8,0.5)_0%,rgba(5,11,8,0.2)_30%,rgba(5,11,8,0.35)_70%,rgba(5,11,8,0.6)_100%)]"
      />
      <Fireflies count={14} lgExtra={10} palette="mixed" className="fixed inset-0 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
