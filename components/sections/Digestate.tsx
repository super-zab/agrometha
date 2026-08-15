"use client";

import { site } from "@/content/site";
import { FieldBloom } from "@/components/scenes/FieldBloom";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

export function Digestate() {
  const { digestate } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 200,
    reducedState: () => {
      gsap.set("[data-anim='soil']", { opacity: 1 });
      gsap.set("[data-anim='stalk']", { scaleY: 1 });
      gsap.set("[data-anim='late']", { opacity: 1, y: 0 });
    },
    /*
     * Ordre imposé : épandage → sol enrichi → pousse des feuilles → TEXTES.
     * Les textes finissent d'apparaître à 0.88 ; le pin court jusqu'à 1, donc
     * la section 7 ne peut pas prendre la main avant qu'ils soient entièrement
     * en place.
     */
    build: (tl) => {
      gsap.set("[data-anim='stalk']", { scaleY: 0, transformOrigin: "center bottom" });
      gsap.set("[data-anim='late']", { opacity: 0, y: 26 });

      tl.to("[data-anim='digestate']", { x: 120, opacity: 0.15, duration: 0.26, ease: "none" }, 0);
      tl.to("[data-anim='soil']", { opacity: 1, duration: 0.24 }, 0.1);

      // Animation VALIDÉE des feuilles — conservée telle quelle.
      tl.to(
        "[data-anim='stalk']",
        { scaleY: 1, duration: 0.3, stagger: 0.022, ease: "back.out(1.4)" },
        0.24,
      );

      // Les textes enchaînent immédiatement après la dernière feuille.
      tl.to(
        "[data-anim='late']",
        { opacity: 1, y: 0, duration: 0.18, stagger: 0.06, ease: "power2.out" },
        0.6,
      );
    },
  });

  return (
    <section id="digestat" ref={ref} className="relative bg-canvas-veil">
      <ScrollPanel backdrop={<OrganicLines tone="agro" density={2} opacity={0.2} />}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow index="06" label="L’engrais" className="mb-3" />
            <RevealText
              text={digestate.title}
              className="text-display text-3xl text-ink sm:text-4xl xl:text-5xl"
            />
            {/* Remplace le mot « digestat » et remonte juste sous le titre. */}
            <p className="text-display mt-3 text-xl text-agro sm:text-2xl xl:text-3xl">
              {digestate.lead}
            </p>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft xl:text-base">
              {digestate.body}
            </p>
          </div>

          <div className="glass shrink-0 rounded-sm px-5 py-3.5">
            <p className="text-[10px] uppercase tracking-wide text-ink-mute">
              {digestate.total.label}
            </p>
            <p className="text-display mt-0.5 text-3xl text-forest">
              <AnimatedCounter value={digestate.total.value} suffix={digestate.total.suffix} />
            </p>
          </div>
        </div>

        <div className="mt-5 xl:mt-7">
          <FieldBloom />
        </div>

        {/* Bloc de texte révélé juste après la pousse des feuilles */}
        <div data-anim="late" className="mt-5 xl:mt-6">
          <p className="max-w-3xl rounded-sm border-l-2 border-agro bg-surface/60 py-3 pl-4 pr-4 text-xs leading-relaxed text-ink-soft xl:text-[13px]">
            {digestate.definition}
          </p>
        </div>

        <div className="mt-4 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-3">
          {digestate.outcomes.map((o) => (
            <div key={o.id} data-anim="late" className="bg-canvas-veil p-4 xl:p-5">
              <p className="text-display text-xl text-agro xl:text-2xl">{o.stat}</p>
              <h3 className="text-display mt-2 text-base text-ink">{o.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft xl:text-[13px]">{o.text}</p>
            </div>
          ))}
        </div>
      </ScrollPanel>
    </section>
  );
}
