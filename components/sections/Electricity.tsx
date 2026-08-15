"use client";

import { site } from "@/content/site";
import { PowerGrid } from "@/components/scenes/PowerGrid";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

const WINDOW_ON = "#F2D08A";
const WINDOW_ON_STROKE = "#D9A94E";

export function Electricity() {
  const { electricity } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 215,
    reducedState: (el) => {
      const grid = el.querySelector<SVGPathElement>("[data-anim='grid']");
      if (grid) {
        gsap.set(grid, { strokeDasharray: grid.getTotalLength(), strokeDashoffset: 0 });
      }
      gsap.set("[data-anim='window']", { fill: WINDOW_ON, stroke: WINDOW_ON_STROKE });
      gsap.set("[data-anim='home-glow']", { opacity: 1 });
      gsap.set("[data-anim='drop']", { opacity: 0.85 });
      gsap.set("[data-anim='kw-halo']", { opacity: 0.55 });
    },
    build: (tl, el) => {
      const grid = el.querySelector<SVGPathElement>("[data-anim='grid']");
      if (grid) {
        const len = grid.getTotalLength();
        gsap.set(grid, { strokeDasharray: len, strokeDashoffset: len });
      }

      // 1. Le point d'injection s'amorce, la ligne se dessine jusqu'au bout.
      tl.from("[data-anim='spark']", { scale: 0, transformOrigin: "center", duration: 0.12 }, 0);
      tl.to("[data-anim='grid']", { strokeDashoffset: 0, duration: 0.34, ease: "none" }, 0.02);

      // 2. Le chiffre-phare et son halo.
      tl.from("[data-anim='kw']", { opacity: 0, y: 28, duration: 0.16 }, 0.14);
      tl.fromTo("[data-anim='kw-halo']", { opacity: 0 }, { opacity: 0.55, duration: 0.18 }, 0.2);

      // 3. Le courant descend de la ligne vers chaque toit.
      tl.to("[data-anim='drop']", { opacity: 0.85, duration: 0.14, stagger: 0.05 }, 0.36);

      /*
       * 4. Les foyers s'allument, fenêtre par fenêtre, en partant du point
       *    d'injection. `stagger.amount` répartit l'ensemble des ~34 fenêtres
       *    sur une durée fixe : le nombre de fenêtres peut changer sans
       *    déborder la timeline.
       */
      tl.to(
        "[data-anim='window']",
        {
          fill: WINDOW_ON,
          stroke: WINDOW_ON_STROKE,
          duration: 0.1,
          ease: "none",
          stagger: { amount: 0.3, from: "start" },
        },
        0.46,
      );
      tl.to(
        "[data-anim='home-glow']",
        { opacity: 1, duration: 0.2, stagger: { amount: 0.24, from: "start" } },
        0.5,
      );

      // 5. Les trois faits chiffrés, une fois la ville allumée.
      tl.from("[data-anim='fact']", { opacity: 0, y: 26, duration: 0.14, stagger: 0.05 }, 0.74);
    },
  });

  return (
    <section id="electricite" ref={ref} className="relative bg-canvas-alt">
      <ScrollPanel>
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionEyebrow index="05" label="L’électricité" className="mb-3" />
            <RevealText
              text={electricity.title}
              className="text-display text-3xl text-ink sm:text-4xl xl:text-5xl"
            />
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft xl:text-base">
              {electricity.body}
            </p>
          </div>

          {/* Chiffre-phare : halo lumineux plutôt que pavé sombre. */}
          <div className="relative">
            <div
              data-anim="kw-halo"
              aria-hidden
              className="halo-volt pointer-events-none absolute inset-[-35%] rounded-full opacity-0 blur-2xl"
            />
            <p
              data-anim="kw"
              className="text-display relative text-6xl tracking-tighter text-forest xl:text-7xl"
            >
              {electricity.power.value}
              <span className="ml-2 text-2xl text-volt-deep xl:text-3xl">
                {electricity.power.unit}
              </span>
              <ConfirmBadge confirmed={electricity.power.confirmed} />
            </p>
            <p className="relative mt-1 text-[10px] uppercase tracking-wide text-ink-mute">
              {electricity.power.label}
            </p>
          </div>
        </div>

        {/* Réseau + foyers qui s'allument. L'espace mort sous l'illustration a
            été supprimé : on enchaîne directement sur les faits chiffrés. */}
        <div className="mt-4 xl:mt-6">
          <div className="mx-auto max-w-5xl">
            <PowerGrid />
          </div>
        </div>

        <div className="mt-4 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-3 xl:mt-6">
          {electricity.facts.map((f) => (
            <div key={f.id} data-anim="fact" className="bg-canvas-alt p-4 xl:p-5">
              <p className="text-display text-xl text-volt-deep xl:text-2xl">{f.stat}</p>
              <h3 className="text-display mt-2 text-base text-ink">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft xl:text-[13px]">{f.text}</p>
            </div>
          ))}
        </div>
      </ScrollPanel>
    </section>
  );
}
