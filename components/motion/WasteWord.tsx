"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/** Bruit déterministe — même rendu serveur et client, pas d'hydratation cassée. */
function noise(i: number) {
  const x = Math.sin(i * 78.233 + 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type Props = {
  children: string;
  className?: string;
};

/**
 * Mot « déchets » — pendant visuel de `EnergyWord`.
 *
 * Quatre couches, toutes sobres :
 *  1. un remplissage granulaire (`.word-waste`) dans les lettres ;
 *  2. une ombre portée décalée, comme de la matière qui déborde ;
 *  3. une entrée lettre par lettre désordonnée qui se « tasse » ;
 *  4. des particules qui se détachent des lettres et tombent.
 *
 * CORRECTIF : `.word-waste` est appliqué à chaque lettre et non au mot entier.
 * Un enfant transformé sort du `background-clip: text` de son parent, si bien
 * que les lettres animées se peignaient avec `-webkit-text-fill-color:
 * transparent` et sans fond — le mot était donc littéralement invisible.
 *
 * En `prefers-reduced-motion`, seul le remplissage reste : le mot est immobile.
 */
export function WasteWord({ children, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const letters = Array.from(children);

  if (reduced) {
    return (
      <span ref={ref} className={cn("inline-block align-baseline", className)}>
        {letters.map((char, i) => (
          <span key={`${char}-${i}`} className="word-waste inline-block">
            {char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("relative inline-block align-baseline", className)}>
      <span aria-label={children}>
        {letters.map((char, i) => {
          const a = noise(i + 1);
          const b = noise(i + 17);
          return (
            <motion.span
              key={`${char}-${i}`}
              aria-hidden
              className="word-waste inline-block"
              initial={{
                y: `${-12 - a * 18}%`,
                rotate: (b - 0.5) * 10,
                scaleY: 1.16,
                opacity: 0,
              }}
              animate={inView ? { y: "0%", rotate: 0, scaleY: 1, opacity: 1 } : undefined}
              transition={{
                duration: 0.95,
                delay: 0.05 + i * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>

      {/* Grains de matière qui se détachent des lettres. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[0.1em] block h-0"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = noise(i + 41);
          const b = noise(i + 73);
          return (
            <span
              key={i}
              className={cn("am-fall absolute block", !inView && "opacity-0")}
              style={{
                left: `${5 + a * 90}%`,
                width: 2 + Math.round(b * 3),
                height: 2 + Math.round(a * 3),
                borderRadius: b > 0.6 ? "50%" : "1px",
                background: b > 0.55 ? "#9E6519" : "#3B2A18",
                animationDelay: `${0.8 + a * 3.6}s`,
                animationDuration: `${2.6 + b * 2.2}s`,
              }}
            />
          );
        })}
      </span>
    </span>
  );
}
