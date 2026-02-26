import type { Metadata } from "next";

import { Fireflies } from "@/components/ui/Fireflies";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig, studioNarrative, studioPillars } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Studio direction, philosophy, and quality standards at ForestlyGames.",
};

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

const lookingFor = [
  {
    role: "Developers",
    detail: "Scripters, builders, modelers, and UI designers who want to ship real games.",
    accent: "emerald",
  },
  {
    role: "Collaborators",
    detail: "Artists, composers, and specialists who bring focused skill to a project.",
    accent: "gold",
  },
  {
    role: "Investors",
    detail: "Partners who want to back games with real traction and a team that delivers.",
    accent: "azure",
  },
] as const;

const lookingForAccents = {
  emerald: {
    border: "border-emerald-300/18",
    dot: "bg-emerald-300/80",
    role: "text-emerald-200",
    detail: "text-mist-100/70",
  },
  gold: {
    border: "border-gold-300/18",
    dot: "bg-gold-300/80",
    role: "text-gold-100",
    detail: "text-mist-100/70",
  },
  azure: {
    border: "border-azure-300/18",
    dot: "bg-azure-300/80",
    role: "text-azure-300",
    detail: "text-mist-100/70",
  },
} as const;

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-bg-950">
        <Fireflies count={16} lgExtra={14} palette="mixed" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(95,202,148,0.06), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(230,198,138,0.04), transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-5 pb-10 pt-28 text-center sm:px-8 sm:pb-14 sm:pt-32 lg:px-12 lg:pb-16 lg:pt-36">
          <p className="inline-block rounded-full border border-emerald-200/25 bg-emerald-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
            About ForestlyGames
          </p>

          <h1 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] tracking-[-0.02em] text-mist-50">
            We build games with speed, craft, and momentum.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist-100/78 sm:text-lg sm:leading-relaxed">
            ForestlyGames is a remote Roblox game studio. Everything we do is
            built around shipping playable games, learning fast, and getting
            better with every release.
          </p>
        </div>
      </section>

      {/* ── Studio Narrative ── */}
      <section className="relative overflow-hidden border-t border-emerald-200/8 bg-bg-900">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="text-center">
            <p className="inline-block rounded-full border border-gold-300/25 bg-gold-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-100">
              How We Work
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
              Studio Philosophy
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {studioNarrative.map((paragraph, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed sm:text-lg sm:leading-relaxed ${
                  i === 0
                    ? "text-mist-50/90 font-medium"
                    : "text-mist-100/72"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="relative overflow-hidden bg-bg-950">
        <Fireflies count={10} lgExtra={10} palette="emerald" />

        <div className="relative mx-auto max-w-360 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
              Studio Pillars
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
              What drives every project.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-mist-100/72 sm:text-lg">
              Three principles that shape how we build.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {studioPillars.map((pillar, index) => {
              const accent = pillarAccents[index % pillarAccents.length];

              return (
                <article
                  key={pillar.title}
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
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent.icon}`}
                      >
                        <span className="font-display text-sm font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p
                        className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${accent.number}`}
                      >
                        Pillar
                      </p>
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-tight text-mist-50 sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-mist-100/70">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who We're Looking For ── */}
      <section className="relative overflow-hidden border-t border-emerald-200/8 bg-bg-900">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="text-center">
            <p className="inline-block rounded-full border border-azure-300/25 bg-azure-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-azure-300/90">
              Work With Us
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
              Who we're looking for.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-mist-100/72 sm:text-lg">
              We work with people who care about quality and want to ship
              something real.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {lookingFor.map((item) => {
              const a = lookingForAccents[item.accent];
              return (
                <div
                  key={item.role}
                  className={`group relative rounded-xl border ${a.border} bg-bg-950/60 p-5 transition-all duration-300 hover:bg-bg-950/80 hover:-translate-y-0.5 sm:p-6`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                    <h3
                      className={`font-display text-lg font-semibold ${a.role}`}
                    >
                      {item.role}
                    </h3>
                  </div>
                  <p className={`mt-2.5 text-sm leading-6 ${a.detail}`}>
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-emerald-200/8 bg-bg-950">
        <Fireflies count={12} lgExtra={10} palette="mixed" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(95,202,148,0.06), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-22 lg:px-12 lg:py-28">
          <h2 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
            <span className="bg-[linear-gradient(135deg,var(--mist-50)_0%,var(--emerald-200)_40%,var(--gold-300)_70%,var(--azure-300)_100%)] bg-clip-text text-transparent">
              Ready to build something together?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mist-100/72 sm:text-lg">
            Whether you want to develop, collaborate, or invest, we'd love to
            hear from you.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href={siteConfig.ctaHref}>
              {siteConfig.ctaLabel}
            </LinkButton>
            <LinkButton href="/games" variant="secondary">
              View Our Games
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
