import { cn } from "@/lib/cn";

type Props = {
  confirmed: boolean;
  /** `dark` = posé sur un fond vert profond. */
  tone?: "light" | "dark";
};

export function ConfirmBadge({ confirmed, tone = "light" }: Props) {
  if (confirmed) return null;
  return (
    <span
      className={cn(
        "ml-2 align-middle text-[9px] font-medium uppercase tracking-wide",
        tone === "dark" ? "text-amber-soft" : "text-amber-deep",
      )}
    >
      [À CONFIRMER]
    </span>
  );
}
