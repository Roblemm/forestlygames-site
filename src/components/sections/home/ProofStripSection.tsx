import { ProofStripScene } from "@/components/motion/scenes/ProofStripScene";
import { studioStats } from "@/data/stats";

export function ProofStripSection() {
  return (
    <section className="relative bg-[#e9e4d8] text-[#151811]">
      <ProofStripScene>
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div data-proof-heading className="max-w-4xl">
            <p className="font-semibold uppercase tracking-[0.22em] text-[#3a5a45]/80">Studio Proof</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,5.2vw,3.6rem)] leading-[0.95] tracking-[-0.01em] text-[#0f120c]">
              ForestlyGames by the numbers.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#243026]/80 sm:text-lg">
              Core performance metrics from the live portfolio and audience footprint.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {studioStats.map((stat) => (
              <article
                key={stat.label}
                data-proof-item
                className="border border-[#2f4435]/20 bg-white/58 p-5 backdrop-blur-[1px] sm:p-6"
              >
                <p className="font-display text-4xl leading-none text-[#0f120d] sm:text-5xl">{stat.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2d5e46]">{stat.label}</p>
                <p className="mt-3 text-base leading-7 text-[#273228]/82">{stat.note}</p>
              </article>
            ))}
          </div>
        </div>
      </ProofStripScene>
    </section>
  );
}
