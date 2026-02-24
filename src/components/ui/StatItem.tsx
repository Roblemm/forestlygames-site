import type { StudioStat } from "@/types/site";

type StatItemProps = {
  stat: StudioStat;
};

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="rounded-2xl border border-emerald-200/15 bg-bg-900/70 p-5 sm:p-6">
      <p className="font-display text-3xl text-mist-50">{stat.value}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200/90">{stat.label}</p>
      <p className="mt-2 text-sm leading-6 text-mist-200/75">{stat.note}</p>
    </div>
  );
}
