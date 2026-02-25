import { StudioStoryScene } from "@/components/motion/scenes/StudioStoryScene";
import { studioNarrative, studioPillars } from "@/data/site";
import Image from "next/image";

export function StudioStorySection() {
  return (
    <section className="relative bg-bg-950">
      <StudioStoryScene>
        <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div data-studio-lead className="max-w-3xl min-w-0">
            <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
              Studio Identity
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,6.8vw,5.2rem)] leading-[0.92] tracking-[-0.01em] text-mist-50">
              We Build, Test, and Ship Games Fast
            </h2>
            <p
              data-studio-sub
              className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-100/78 sm:text-xl"
            >
              Remote team, short iteration cycles, and disciplined execution focused on releasing Roblox games that
              players return to.
            </p>
          </div>

          <div
            data-studio-media
            className="relative mt-10 min-h-52 min-w-0 overflow-hidden rounded-xl border border-emerald-200/16 bg-[linear-gradient(140deg,#11281f_2%,#070f0c_40%,#161308_100%)] shadow-[0_8px_40px_-8px_rgba(85,190,136,0.08)] sm:min-h-64"
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
                Build Loop
              </p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-emerald-100/82">
                Prototype | Iterate | Publish
              </p>
            </div>
            <Image
              src="/brand/mascot-face.png"
              alt="Forestly mascot icon"
              width={120}
              height={120}
              className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-24 object-contain opacity-80 drop-shadow-[0_8px_20px_rgba(92,111,255,0.28)] sm:-bottom-3 sm:-right-3 sm:h-28 sm:w-28"
            />
          </div>

          <div data-studio-narrative className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0 space-y-5 text-base leading-8 text-mist-100/78 sm:text-lg">
              {studioNarrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="min-w-0 space-y-4">
              {studioPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  data-studio-pillar
                  data-studio-depth={index % 2}
                  className="group relative w-full overflow-hidden rounded-xl border border-emerald-200/18 bg-bg-900/55 p-6 transition-colors duration-300 hover:bg-bg-900/70 sm:p-7"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald-300/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-200/60">
                      Pillar {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2.5 font-display text-2xl leading-tight text-mist-50 sm:text-[1.7rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-mist-100/74">{pillar.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </StudioStoryScene>
    </section>
  );
}
