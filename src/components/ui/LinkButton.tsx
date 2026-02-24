import type { ReactNode } from "react";

import Link from "next/link";

import { type ButtonVariant, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
};

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function LinkButton({ href, children, variant = "primary", className, target, rel }: LinkButtonProps) {
  const classes = cn(buttonVariants(variant), className);

  if (isExternalHref(href)) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
