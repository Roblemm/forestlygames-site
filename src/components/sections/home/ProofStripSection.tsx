import { ProofStripScene } from "@/components/motion/scenes/ProofStripScene";
import { studioStats } from "@/data/stats";

const statAccents = [
  {
    border: "border-[#2d6e46]/20",
    glow: "from-[#3a8a56]/20 via-[#3a8a56]/5 to-transparent",
    number: "text-[#1a5c35]",
    label: "text-[#2d6e46]",
    bar: "bg-[#3a8a56]/30",
  },
  {
    border: "border-[#7a6528]/20",
    glow: "from-[#a08430]/18 via-[#a08430]/5 to-transparent",
    number: "text-[#6b5520]",
    label: "text-[#7a6528]",
    bar: "bg-[#a08430]/30",
  },
  {
    border: "border-[#3a6a8a]/20",
    glow: "from-[#4a8aaa]/18 via-[#4a8aaa]/5 to-transparent",
    number: "text-[#2a5a7a]",
    label: "text-[#3a6a8a]",
    bar: "bg-[#4a8aaa]/30",
  },
];

export function ProofStripSection() {
  return (
    <section className="relative bg-[#e9e4d8] text-[#151811]">
      <ProofStripScene>
        <div className="mx-auto max-w-360 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
          <div data-proof-heading className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-[#3a5a45]/22 bg-[#3a5a45]/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#3a5a45]/85">
              Studio Proof
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.95] tracking-[-0.01em] text-[#0f120c]">
              ForestlyGames by the numbers.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#243026]/74 sm:text-lg">
              Real stats from real games.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studioStats.map((stat, index) => {
              const accent = statAccents[index % statAccents.length];

              return (
                <article
                  key={stat.label}
                  data-proof-item
                  className={`group relative overflow-hidden rounded-2xl border ${accent.border} bg-white/55 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-[0_8px_32px_-6px_rgba(40,80,56,0.14)] hover:-translate-y-0.5 sm:p-7`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br ${accent.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div
                    aria-hidden
                    className={`absolute bottom-0 left-0 h-1 ${accent.bar} w-0 transition-all duration-500 ease-out group-hover:w-full`}
                  />
                  <div className="relative">
                    <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#2d5e46]/50">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none tracking-tight ${accent.number}`}>
                      {stat.value}
                    </p>
                    <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.18em] ${accent.label}`}>
                      {stat.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#273228]/72">{stat.note}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </ProofStripScene>
    </section>
  );
}
