import { StudioStoryScene } from "@/components/motion/scenes/StudioStoryScene";
import { studioPillars } from "@/data/site";

const pillarAccents = [
  {
    border: "border-emerald-300/20",
    glow: "from-emerald-300/12 via-emerald-300/3 to-transparent",
    icon: "bg-emerald-300/15 text-emerald-300",
    number: "text-emerald-300/50",
  },
  {
    border: "border-gold-300/20",
    glow: "from-gold-300/12 via-gold-300/3 to-transparent",
    icon: "bg-gold-300/15 text-gold-300",
    number: "text-gold-300/50",
  },
  {
    border: "border-azure-300/20",
    glow: "from-azure-300/12 via-azure-300/3 to-transparent",
    icon: "bg-azure-300/15 text-azure-300",
    number: "text-azure-300/50",
  },
];

export function StudioStorySection() {
  return (
    <section className="relative bg-bg-950">
      <StudioStoryScene>
        <div className="mx-auto max-w-360 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div data-studio-lead className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
              Studio Identity
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[0.92] tracking-[-0.01em] text-mist-50">
              We Build, Test, and Ship Games Fast
            </h2>
            <p
              data-studio-sub
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist-100/72 sm:text-lg"
            >
              Fast prototyping, quick iterations, and constant forward momentum.
            </p>
          </div>

          <div data-studio-narrative className="mt-10 grid gap-4 sm:grid-cols-3">
            {studioPillars.map((pillar, index) => {
              const accent = pillarAccents[index % pillarAccents.length];

              return (
                <article
                  key={pillar.title}
                  data-studio-pillar
                  data-studio-depth={index % 2}
                  className={`group relative w-full overflow-hidden rounded-2xl border ${accent.border} bg-bg-900/50 p-6 transition-all duration-300 hover:bg-bg-900/70 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-6px_rgba(85,190,136,0.12)] sm:p-7`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br ${accent.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-300/30 transition-all duration-500 ease-out group-hover:w-full"
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent.icon}`}>
                        <span className="font-display text-sm font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${accent.number}`}>
                        Pillar
                      </p>
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-tight text-mist-50 sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-mist-100/70">{pillar.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </StudioStoryScene>
    </section>
  );
}
