import { cn } from "@/lib/cn";

type Props = {
  label: string;
  className?: string;
};

export function Placeholder({ label, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-sm border border-dashed border-line-strong bg-surface/50 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-wide text-ink-mute">
        [ {label} ]
      </span>
    </div>
  );
}
