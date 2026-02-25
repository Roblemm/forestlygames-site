import { testimonials } from "@/data/site";
import { TestimonialsRail } from "@/components/ui/TestimonialsRail";

export function TestimonialsSection() {
  return (
    <section className="relative border-y border-emerald-200/10 bg-bg-900/85">
      <div className="mx-auto max-w-384 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-4xl">
          <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
            Testimonials
          </p>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,6vw,4.2rem)] leading-[0.94] tracking-[-0.01em] text-mist-50">
            Testimonials from people who built with us.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-mist-100/74 sm:text-lg lg:text-xl">
            Real feedback from developers, builders, artists, and collaborators who have worked with the studio.
          </p>
        </div>

        <div className="relative mt-10">
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
