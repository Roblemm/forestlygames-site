import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { contactMethods } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ForestlyGames for collaboration, talent, and partner opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Collaboration, talent, and partner conversations start here."
        description="Send a clear message about your goals and context. The team keeps outreach practical and response-focused."
      />

      <Section className="pt-2">
        <Container className="grid gap-5 md:grid-cols-2">
          {contactMethods.map((method) => (
            <article key={method.href} className="rounded-2xl border border-emerald-200/15 bg-bg-900/70 p-6">
              <Badge className="bg-emerald-300/8 text-emerald-100">{method.label}</Badge>
              <p className="mt-4 text-sm leading-7 text-mist-200/85">{method.detail}</p>
              <div className="mt-6">
                <LinkButton href={method.href} variant="secondary">
                  {method.action}
                </LinkButton>
              </div>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
