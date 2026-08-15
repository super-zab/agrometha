"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Motif de lignes organiques repris de l'identité AgroMetha (slides). */
const PATHS = [
  "M-60 340 C 160 250, 300 420, 520 320 S 900 180, 1140 268 S 1420 330, 1560 262",
  "M-60 400 C 180 320, 320 470, 540 372 S 910 240, 1150 322 S 1430 386, 1560 320",
  "M-60 462 C 200 392, 344 522, 560 428 S 924 302, 1162 380, 1440 444 1560 382",
  "M-60 260 C 140 180, 286 344, 500 250 S 884 118, 1128 208 S 1408 272, 1560 202",
];

type Props = {
  className?: string;
  /** Densité : nombre de courbes affichées (1 à 4). */
  density?: number;
  /** Teinte du tracé animé. */
  tone?: "agro" | "volt" | "amber";
  opacity?: number;
};

const TONES = {
  agro: "#4A7C4E",
  volt: "#12BE85",
  amber: "#D89A3F",
} as const;

export function OrganicLines({
  className,
  density = 4,
  tone = "agro",
  opacity = 0.5,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const paths = PATHS.slice(0, Math.max(1, Math.min(4, density)));

  /*
   * PERF : l'animation `stroke-dashoffset` repeint la géométrie du tracé à
   * chaque frame. Avec 6 instances sur la page, ça tournait en permanence, y
   * compris pour des sections hors écran. On met en pause dès que l'élément
   * quitte le viewport (la règle CSS est dans globals.css).
   */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.dataset.lines = "idle";
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.lines = entry.isIntersecting ? "live" : "idle";
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 1500 620"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`am-line-fade-${tone}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={TONES[tone]} stopOpacity="0" />
          <stop offset="0.28" stopColor={TONES[tone]} stopOpacity="0.55" />
          <stop offset="0.72" stopColor={TONES[tone]} stopOpacity="0.55" />
          <stop offset="1" stopColor={TONES[tone]} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Trame de fond, statique. */}
      {paths.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          stroke={`url(#am-line-fade-${tone})`}
          strokeWidth={i === 0 ? 1.4 : 1}
          strokeOpacity={0.45}
        />
      ))}

      {/* Segments lumineux qui parcourent les courbes. */}
      {!reduced &&
        paths.map((d, i) => (
          <path
            key={`trace-${i}`}
            d={d}
            fill="none"
            stroke={TONES[tone]}
            strokeWidth="1.6"
            strokeLinecap="round"
            className="am-trace"
            style={{ animationDelay: `${i * 2.6}s`, animationDuration: `${13 + i * 2.5}s` }}
          />
        ))}
    </svg>
  );
}
