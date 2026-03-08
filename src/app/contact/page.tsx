import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { contactMethods } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Join the official Forestly Discord servers for developer applications, opportunities, and community updates.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Join us on Discord."
        description="ForestlyDevs is where developers apply and contact us for opportunities. ForestlyGames is the main community and game server."
      />

      <Section className="pt-2">
        <Container className="grid gap-5 md:grid-cols-2">
          {contactMethods.map((method) => (
            <article key={method.href} className="rounded-2xl border border-emerald-200/15 bg-bg-900/70 p-6">
              {method.iconSrc ? (
                <div className="relative mb-4 h-14 w-full max-w-[14rem] overflow-hidden rounded-lg border border-emerald-200/18 bg-bg-950/60 px-2">
                  <Image src={method.iconSrc} alt={`${method.label} icon`} fill sizes="224px" className="object-contain p-1" />
                </div>
              ) : null}
              <Badge className="bg-emerald-300/8 text-emerald-100">{method.label}</Badge>
              <p className="mt-4 text-sm leading-7 text-mist-200/85">{method.detail}</p>
              <div className="mt-6">
                <LinkButton href={method.href} variant="secondary" target="_blank" rel="noreferrer noopener">
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
