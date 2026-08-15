"use client";

import { useRef } from "react";
import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: string;
  className?: string;
};

/**
 * Mot « énergie ».
 *
 * Trois couches superposées :
 *  1. un halo diffus dont l'intensité (`--glow`) monte avec le scroll ;
 *  2. le remplissage : un dégradé qui traverse le texte comme un courant ;
 *  3. un contour émeraude révélé de gauche à droite (`--lit`) au scroll.
 *
 * En `prefers-reduced-motion`, le dégradé est figé, le halo fixe, le contour entier.
 */
export function EnergyWord({ children, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });

  const litValue = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lit = useMotionTemplate`${litValue}%`;
  const glow = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.26, 0.5]);

  return (
    <motion.span
      ref={ref}
      className={cn("relative inline-block align-baseline", className)}
      style={
        reduced
          ? undefined
          : ({ "--lit": lit, "--glow": glow } as React.CSSProperties)
      }
    >
      {/* 1 — halo */}
      <span
        aria-hidden
        className="word-energy-glow pointer-events-none absolute inset-0 select-none"
      >
        {children}
      </span>

      {/* 2 — courant qui traverse le texte */}
      <span className="word-energy relative inline-block">{children}</span>

      {/* 3 — contour qui s'allume */}
      <span
        aria-hidden
        className="word-energy-stroke pointer-events-none absolute inset-0 select-none"
      >
        {children}
      </span>
    </motion.span>
  );
}
