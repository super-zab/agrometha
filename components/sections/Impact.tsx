"use client";

import { useLayoutEffect, useRef } from "react";
import { site } from "@/content/site";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Seule bande sombre du parcours : le vert profond sert ici d'accent
 * pour faire ressortir les chiffres, pas de fond dominant.
 */
export function Impact() {
  const { impact } = site;
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-anim='stat']", { opacity: 1, y: 0 });
        return;
      }

      /*
       * Déclenchement ancré sur la SECTION SUIVANTE, pas sur celle-ci :
       * l'animation démarre dès que le haut de la section 9 (« Le projet »)
       * entre dans le viewport, et se termine avant qu'elle n'occupe l'écran.
       * Ça supprime le temps mort entre les deux sections.
       */
      const next = document.getElementById("projet");
      if (!next) return;

      gsap.from("[data-anim='stat']", {
        opacity: 0,
        y: 34,
        stagger: 0.06,
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top 55%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative overflow-hidden bg-forest px-5 py-28 md:px-8 md:py-36"
    >
      <OrganicLines tone="volt" density={4} opacity={0.3} />
      <div
        aria-hidden
        className="halo-volt pointer-events-none absolute left-1/2 top-0 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionEyebrow index="08" label="L’impact" tone="dark" />
        <RevealText
          text={impact.title}
          className="text-display max-w-4xl text-4xl text-canvas md:text-6xl"
        />
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-agro-pale">{impact.body}</p>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-canvas/15 sm:grid-cols-2 lg:grid-cols-4">
          {impact.stats.map((s) => (
            <li key={s.id} data-anim="stat" className="bg-forest p-6 md:p-7">
              <p
                className="text-display text-3xl text-volt-soft md:text-4xl"
                style={{ textShadow: "0 0 34px rgba(95,224,176,0.35)" }}
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 text-[11px] uppercase leading-snug tracking-wide text-agro-pale">
                {s.label}
                <ConfirmBadge confirmed={s.confirmed} tone="dark" />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
