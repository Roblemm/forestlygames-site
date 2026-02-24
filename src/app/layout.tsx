import type { Metadata } from "next";
import { Manrope, Oxanium } from "next/font/google";

import { PageShell } from "@/components/layout/PageShell";
import { siteConfig } from "@/data/site";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Oxanium({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${bodyFont.variable} ${headingFont.variable} font-sans antialiased`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
