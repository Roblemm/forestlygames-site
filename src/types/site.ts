export interface NavItem {
  label: string;
  href: string;
}

export interface StudioStat {
  value: string;
  label: string;
  note: string;
}

export interface ContactMethod {
  label: string;
  href: string;
  action: string;
  detail: string;
}

export interface StudioPillar {
  title: string;
  description: string;
}

export interface TestimonialHighlight {
  text: string;
  color: "emerald" | "gold" | "azure";
}

export interface Testimonial {
  quote: string;
  attribution: string;
  highlights?: TestimonialHighlight[];
}
