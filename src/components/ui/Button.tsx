import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950";

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-emerald-300 text-bg-950 hover:bg-emerald-200",
  secondary: "border border-emerald-200/30 bg-emerald-950/40 text-mist-50 hover:border-emerald-200/60 hover:bg-emerald-900/50",
  ghost: "border border-transparent bg-transparent text-mist-100 hover:border-emerald-200/30 hover:bg-emerald-950/35",
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
