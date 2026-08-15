import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  mark?: boolean;
};

export function Logo({ className, mark }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden className="shrink-0">
        <rect width="32" height="32" rx="3" fill="#14372A" />
        <path d="M8 22.5 L16 7.5 L24 22.5" fill="none" stroke="#CFE0CC" strokeWidth="1.6" />
        <circle cx="16" cy="20" r="3.2" fill="#12BE85" />
      </svg>
      {mark ? null : (
        <span className="text-display text-[17px] tracking-tight text-ink">AgroMetha</span>
      )}
    </span>
  );
}
