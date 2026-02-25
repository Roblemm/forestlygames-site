import { Fireflies } from "@/components/ui/Fireflies";
import { testimonials } from "@/data/site";
import { TestimonialsRail } from "@/components/ui/TestimonialsRail";

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-emerald-200/10 bg-bg-900/85">
      <Fireflies count={14} lgExtra={12} palette="emerald" />
      <div className="mx-auto max-w-384 px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
            Testimonials from people who built with us.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-mist-100/74 sm:text-lg lg:text-xl">
            Real feedback from developers, builders, artists, and collaborators who have worked with the studio.
          </p>
        </div>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-bg-900/95 to-transparent sm:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-bg-900/95 to-transparent sm:w-24"
          />
          <TestimonialsRail testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
