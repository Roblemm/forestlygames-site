import { ProofStripScene } from "@/components/motion/scenes/ProofStripScene";
import { studioStats } from "@/data/stats";

export function ProofStripSection() {
  return (
    <section className="relative bg-[#e9e4d8] text-[#151811]">
      <ProofStripScene>
        <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
          <div data-proof-heading className="max-w-4xl">
            <p className="inline-block rounded-full border border-[#3a5a45]/22 bg-[#3a5a45]/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#3a5a45]/85">
              Studio Proof
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,5.2vw,3.6rem)] leading-[0.95] tracking-[-0.01em] text-[#0f120c]">
              ForestlyGames by the numbers.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#243026]/74 sm:text-lg">
              Core performance metrics from the live portfolio and audience footprint.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studioStats.map((stat, index) => (
              <article
                key={stat.label}
                data-proof-item
                className="group relative overflow-hidden rounded-xl border border-[#2f4435]/16 bg-white/52 p-6 backdrop-blur-[2px] transition-colors duration-300 hover:bg-white/68 sm:p-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#3a5a45]/6 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                />
                <div className="relative">
                  <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#2d5e46]/60">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-tight text-[#0f120d]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d5e46]">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#273228]/76">{stat.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ProofStripScene>
    </section>
  );
}
