"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  volt: boolean;
};

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Poussière de particules très discrète.
 *
 * PERF : uniquement des `transform` animés (pas de `box-shadow` animé, qui
 * force une re-rasterisation par frame), et mise en pause hors viewport.
 */
export function OrganicParticles() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const count = isMobile ? 8 : 18;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = seed(i + 1);
      const r2 = seed(i + 40);
      const r3 = seed(i + 80);
      const r4 = seed(i + 120);
      return {
        left: `${8 + r1 * 84}%`,
        top: `${10 + r2 * 75}%`,
        size: 3 + r3 * 8,
        delay: `${r4 * 3}s`,
        duration: `${6 + r1 * 6}s`,
        volt: r2 > 0.7,
      };
    });
  }, [count]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.dataset.particles = "idle";
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.particles = entry.isIntersecting ? "live" : "idle";
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.volt ? "#12BE85" : "#4A7C4E",
            opacity: p.volt ? 0.3 : 0.15,
            animation: reduced
              ? undefined
              : `am-float ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
