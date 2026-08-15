"use client";

import { site } from "@/content/site";
import { CycleDiagram } from "@/components/scenes/CycleDiagram";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

const CIRCUMFERENCE = 2 * Math.PI * 138;

export function CircularLoop() {
  const { cycle } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 200,
    reducedState: (el) => {
      const path = el.querySelector<SVGCircleElement>("[data-anim='cycle-path']");
      if (path) gsap.set(path, { strokeDasharray: CIRCUMFERENCE, strokeDashoffset: 0 });
      gsap.set("[data-anim='cycle-node']", { opacity: 1, scale: 1, transformOrigin: "center" });
      gsap.set("[data-anim='revbar']", { scaleX: 1 });
    },
    /*
     * Séquence VALIDÉE du cercle — reprise à l'identique (tracé qui se ferme,
     * nœuds qui s'allument dans l'ordre, curseur qui fait un tour complet).
     */
    build: (tl, el) => {
      const path = el.querySelector<SVGCircleElement>("[data-anim='cycle-path']");
      if (path) {
        gsap.set(path, {
          strokeDasharray: CIRCUMFERENCE,
          strokeDashoffset: CIRCUMFERENCE,
        });
      }
      gsap.set("[data-anim='cycle-node']", {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "center",
      });
      gsap.set("[data-anim='revbar']", { scaleX: 0, transformOrigin: "left center" });

      tl.to("[data-anim='cycle-path']", { strokeDashoffset: 0, duration: 0.72, ease: "none" }, 0);
      tl.to(
        "[data-anim='cycle-node']",
        { opacity: 1, scale: 1, duration: 0.14, stagger: 0.1, transformOrigin: "center" },
        0.12,
      );
      tl.fromTo(
        "[data-anim='cycle-rotator']",
        { rotation: 0, svgOrigin: "210 210" },
        { rotation: 360, svgOrigin: "210 210", duration: 0.86, ease: "none" },
        0,
      );
      tl.to(
        "[data-anim='revbar']",
        { scaleX: 1, duration: 0.18, stagger: 0.1, ease: "power2.out" },
        0.5,
      );
    },
  });

  return (
    <section id="boucle" ref={ref} className="relative bg-canvas">
      <ScrollPanel>
        {/* Titre à gauche, cercle AgroMetha à droite — côte à côte. */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <SectionEyebrow index="07" label="La boucle" className="mb-3" />
            <RevealText
              text={cycle.title}
              className="text-display text-3xl text-ink sm:text-4xl xl:text-5xl"
            />
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft xl:text-base">
              {cycle.body}
            </p>

            {/* Répartition remontée : directement sous le texte de titre. */}
            <div className="mt-7 xl:mt-9">
              <h3 className="text-[10px] font-medium uppercase tracking-wide text-ink-mute">
                {cycle.revenueTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {cycle.revenue.map((r, i) => (
                  <li key={r.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13px] text-ink-soft">{r.label}</span>
                      <span className="text-display text-lg text-forest">{r.share} %</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                      <div
                        data-anim="revbar"
                        className={
                          i === 0
                            ? "h-full origin-left rounded-full bg-gradient-to-r from-agro to-agro-light"
                            : i === 1
                              ? "h-full origin-left rounded-full bg-gradient-to-r from-volt-deep to-volt"
                              : "h-full origin-left rounded-full bg-gradient-to-r from-amber-deep to-amber"
                        }
                        style={{ width: `${r.share}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-first lg:order-none">
            <CycleDiagram />
          </div>
        </div>
      </ScrollPanel>
    </section>
  );
}
