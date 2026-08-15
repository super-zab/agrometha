import { cn } from "@/lib/cn";

type Props = {
  index: string;
  label?: string;
  /** `dark` = posé sur un fond vert profond (section Impact). */
  tone?: "light" | "dark";
  className?: string;
};

export function SectionEyebrow({ index, label, tone = "light", className }: Props) {
  const dark = tone === "dark";

  return (
    <p
      className={cn(
        "mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-wide",
        dark ? "text-agro-pale" : "text-ink-mute",
        className,
      )}
    >
      <span className={dark ? "text-volt-soft" : "text-agro"}>{index}</span>
      {label ? (
        <>
          <span className={cn("h-px w-8", dark ? "bg-canvas/25" : "bg-line-strong")} aria-hidden />
          <span>{label}</span>
        </>
      ) : null}
    </p>
  );
}
