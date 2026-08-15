"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Largeur du contenu. `max-w-7xl` par défaut. */
  innerClassName?: string;
  /**
   * Décor de fond (lignes organiques, halos…).
   * À passer ici plutôt que sur la `<section>` : la section, une fois pinnée,
   * est aussi haute que la distance de pin, un fond posé dessus serait étiré
   * sur plusieurs écrans. Ici il fait exactement un viewport et suit le pin.
   */
  backdrop?: React.ReactNode;
};

/**
 * Le panneau qui sera pinné par `usePinnedScene` (il le repère via `data-panel`).
 *
 * Contrainte : hauteur *exactement* un viewport, contenu dimensionné pour y
 * tenir. C'est ce qui garantit qu'une section « tient sur un seul écran » et
 * qu'un pin ne peut jamais rogner le bas du contenu.
 *
 * En `prefers-reduced-motion`, plus de pin : le panneau reprend une hauteur
 * naturelle et le contenu se lit en défilement normal.
 */
export function ScrollPanel({ children, className, innerClassName, backdrop }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      data-panel
      className={cn(
        "relative flex w-full items-center overflow-hidden",
        reduced ? "min-h-svh py-20" : "h-svh",
        className,
      )}
    >
      {backdrop}
      <div
        className={cn("relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}
