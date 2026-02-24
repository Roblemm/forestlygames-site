import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Section className="pt-10 sm:pt-14">
      <Container>
        <div className="rounded-3xl border border-emerald-200/15 bg-bg-900/70 p-8 sm:p-10">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-mist-50 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-mist-200/85">{description}</p>
        </div>
      </Container>
    </Section>
  );
}
