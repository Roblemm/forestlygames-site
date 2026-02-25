import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950";

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-300 text-bg-950 hover:bg-emerald-200 hover:shadow-[0_0_24px_-2px_rgba(95,202,148,0.5)] hover:scale-[1.03] active:scale-[0.98]",
  secondary:
    "border border-emerald-200/30 bg-emerald-400/10 text-mist-50 hover:border-emerald-200/60 hover:bg-emerald-400/20 hover:shadow-[0_0_20px_-4px_rgba(95,202,148,0.3)] hover:scale-[1.03] active:scale-[0.98]",
  ghost:
    "border border-mist-50/16 bg-transparent text-mist-100 hover:border-emerald-200/40 hover:bg-emerald-400/12 hover:text-mist-50 hover:shadow-[0_0_16px_-4px_rgba(95,202,148,0.2)] hover:scale-[1.03] active:scale-[0.98]",
};

export function buttonVariants(variant: ButtonVariant = "primary"): string {
  return cn(baseClasses, variantClassMap[variant]);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(buttonVariants(variant), className)} {...props} />;
}
