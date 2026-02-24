import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/85">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-mist-50 sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-mist-200/85">{description}</p> : null}
    </div>
  );
}
