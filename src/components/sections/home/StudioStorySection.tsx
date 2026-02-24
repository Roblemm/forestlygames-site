import { StudioStoryScene } from "@/components/motion/scenes/StudioStoryScene";
import { studioNarrative, studioPillars } from "@/data/site";

export function StudioStorySection() {
  return (
    <section className="relative bg-bg-950">
      <StudioStoryScene>
        <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div data-studio-lead className="max-w-3xl min-w-0">
              <p className="font-semibold uppercase tracking-[0.22em] text-emerald-200/90">Studio Identity</p>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.2rem,6.8vw,5.2rem)] leading-[0.92] tracking-[-0.01em] text-mist-50">
                Built With Taste, Discipline, and Momentum
              </h2>
              <p data-studio-sub className="mt-5 text-lg leading-relaxed text-mist-100/82 sm:text-xl">
                ForestlyGames merges visual atmosphere with production clarity so each release feels deliberate,
                playable, and premium.
              </p>
            </div>

            <div
              data-studio-media
              className="relative min-h-[16rem] min-w-0 border border-emerald-200/20 bg-[linear-gradient(140deg,#11281f_2%,#070f0c_40%,#161308_100%)] sm:min-h-[20rem]"
            >
              <div
                aria-hidden
                data-studio-media-layer="far"
                className="absolute inset-0 bg-[radial-gradient(circle_at_24%_26%,rgba(131,233,178,0.24),transparent_46%),radial-gradient(circle_at_78%_72%,rgba(208,165,90,0.2),transparent_42%)]"
              />
              <div
                aria-hidden
                data-studio-media-layer="near"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,8,0.08)_0%,rgba(4,10,8,0.78)_100%)]"
              />
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <p className="font-display text-[clamp(1.2rem,3vw,2.4rem)] uppercase tracking-[0.16em] text-mist-50/90">
                  Studio Principles
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-100/86">Execution Over Noise</p>
              </div>
            </div>
          </div>

          <div data-studio-narrative className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0 space-y-4 text-base leading-8 text-mist-100/82 sm:text-lg">
              {studioNarrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="min-w-0 space-y-4 lg:ml-auto lg:w-full lg:max-w-[34rem]">
              {studioPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  data-studio-pillar
                  data-studio-depth={index % 2}
                  className="w-full border border-emerald-200/20 bg-bg-900/64 p-5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/92">Pillar</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-mist-50 sm:text-3xl">{pillar.title}</h3>
                  <p className="mt-3 text-base leading-7 text-mist-100/80">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </StudioStoryScene>
    </section>
  );
}
