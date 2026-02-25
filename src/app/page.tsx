import { CtaSection } from "@/components/sections/home/CtaSection";
import { FeaturedGamesSection } from "@/components/sections/home/FeaturedGamesSection";
import { FeaturedQuoteSection } from "@/components/sections/home/FeaturedQuoteSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ProofStripSection } from "@/components/sections/home/ProofStripSection";
import { StudioStorySection } from "@/components/sections/home/StudioStorySection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofStripSection />
      <FeaturedQuoteSection />
      <FeaturedGamesSection />
      <StudioStorySection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
