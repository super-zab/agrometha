"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Build = (tl: gsap.core.Timeline, el: HTMLElement) => void;
type ReducedState = (el: HTMLElement) => void;

type Options = {
  /** Durée du pin, en % de hauteur de viewport. 180 = on scrolle 1,8 écran. */
  length?: number;
  /** Construit la timeline. Toutes les positions sont dans [0, 1]. */
  build: Build;
  /** État final posé d'emblée quand les animations sont désactivées. */
  reducedState?: ReducedState;
};

/**
 * Scène pinnée + scrubbée.
 *
 * C'est le remplaçant unique des déclenchements « viewport enter » qui étaient
 * disséminés dans les sections (`start: "top 85%"`, `end: "center center"`…).
 * Avec ces triggers relatifs au viewport, l'animation se jouait pendant que la
 * section montait encore : elle était terminée au moment où l'utilisateur
 * atterrissait dessus.
 *
 * Ici le contrat est strict :
 *   - la section se cale en haut de l'écran (`start: "top top"`) ;
 *   - elle y reste (`pin`) pendant `length` % de viewport ;
 *   - la progression de la timeline est *exactement* la progression du scroll
 *     dans ce pin (`scrub`). Rien ne peut se jouer avant l'arrivée, rien ne
 *     s'autoplay.
 *
 * La timeline est normalisée à une durée de 1 par un « tween-repère » : une
 * position de 0.4 dans `build` correspond donc littéralement à 40 % du scroll
 * de la section. Corollaire : aucun tween ne doit se terminer après 1, sinon
 * la timeline s'allonge et le mapping se décale.
 */
export function usePinnedScene<T extends HTMLElement = HTMLElement>({
  length = 180,
  build,
  reducedState,
}: Options) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  // Les callbacks changent d'identité à chaque render : on les garde dans des
  // refs pour que l'effet ne dépende que de valeurs primitives.
  const buildRef = useRef(build);
  const reducedRef = useRef(reducedState);
  buildRef.current = build;
  reducedRef.current = reducedState;

  useLayoutEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        reducedRef.current?.(el);
        return;
      }

      const panel = el.querySelector<HTMLElement>("[data-panel]") ?? el;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${length}%`,
          pin: panel,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Tween-repère : verrouille la durée totale à 1.
      tl.to({}, { duration: 1 }, 0);
      buildRef.current(tl, el);

      // Garde-fou : un tween qui dépasse 1 rallonge la timeline et décale
      // toutes les positions par rapport à la progression du scroll.
      if (process.env.NODE_ENV !== "production" && tl.duration() > 1.0001) {
        console.warn(
          `[usePinnedScene] timeline de ${tl.duration().toFixed(3)} au lieu de 1 ` +
            `sur #${el.id} : un tween se termine après 1, le scrubbing est décalé.`,
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, length]);

  return ref;
}
