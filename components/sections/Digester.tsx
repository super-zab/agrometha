"use client";

import { site } from "@/content/site";
import { DigesterCutaway } from "@/components/scenes/DigesterCutaway";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

/** Instants (0 → 1) auxquels chaque étape biologique s'allume. */
const MARKS = [0.2, 0.36, 0.52, 0.68];

export function Digester() {
  const { digester } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 230,
    reducedState: () => {
      gsap.set("[data-anim='fill']", { y: -286 });
      gsap.set("[data-anim='bubble']", { opacity: 0.75 });
      gsap.set("[data-anim='gaspocket'], [data-anim='dome-arc']", { opacity: 1 });
      gsap.set("[data-anim='gasline'], [data-anim='gasdot']", { opacity: 1 });
      gsap.set("[data-anim='outlet'], [data-anim='inlet-matter']", { opacity: 1 });
      gsap.set("[data-zone]", { opacity: 1 });
      gsap.set("[data-stage]", { opacity: 1, borderLeftColor: "#B4C4B2" });
    },
    build: (tl) => {
      gsap.set("[data-zone]", { opacity: 0 });

      tl.to(
        "[data-anim='inlet-matter']",
        { opacity: 1, x: 26, duration: 0.18, stagger: 0.04, ease: "none" },
        0,
      );
      tl.to("[data-anim='fill']", { y: -286, duration: 0.62, ease: "none" }, 0.02);

      digester.stages.forEach((st, i) => {
        tl.to(`[data-zone='${st.id}']`, { opacity: 1, duration: 0.09 }, MARKS[i]);

        /*
         * PERF : le surlignage de l'étape est écrit directement par GSAP sur le
         * DOM. Avant, un `setActiveStage()` dans `onUpdate` re-rendait toute la
         * colonne de texte à chaque tick de scroll.
         */
        tl.to(
          `[data-stage='${st.id}']`,
          { opacity: 1, borderLeftColor: "#12BE85", backgroundColor: "rgba(255,255,255,0.7)", duration: 0.09 },
          MARKS[i],
        );
        tl.to(
          `[data-stage='${st.id}'] [data-stage-label]`,
          { color: "#0A8C61", duration: 0.09 },
          MARKS[i],
        );
        // L'étape précédente redescend d'un cran quand la suivante s'allume.
        if (i > 0) {
          tl.to(
            `[data-stage='${digester.stages[i - 1].id}']`,
            { opacity: 0.65, borderLeftColor: "#7BA97D", backgroundColor: "rgba(255,255,255,0)", duration: 0.09 },
            MARKS[i],
          );
          tl.to(
            `[data-stage='${digester.stages[i - 1].id}'] [data-stage-label]`,
            { color: "#6E7D73", duration: 0.09 },
            MARKS[i],
          );
        }
      });

      tl.to(
        "[data-anim='bubble']",
        { opacity: 0.85, y: -46, duration: 0.34, stagger: 0.035, ease: "none" },
        0.3,
      );
      tl.to("[data-anim='gaspocket']", { opacity: 1, duration: 0.14 }, 0.66);
      tl.to("[data-anim='dome-arc']", { opacity: 1, duration: 0.12 }, 0.72);
      tl.to("[data-anim='gasdot']", { opacity: 1, duration: 0.1 }, 0.78);
      tl.to("[data-anim='gasline']", { opacity: 1, duration: 0.12 }, 0.82);
      tl.to("[data-anim='outlet']", { opacity: 1, duration: 0.12 }, 0.84);
    },
  });

  return (
    <section id="digesteur" ref={ref} className="relative bg-canvas-veil">
      <ScrollPanel backdrop={<OrganicLines tone="agro" density={2} opacity={0.22} />}>
        {/*
          Desktop : texte à gauche, coupe du digesteur à droite.
          Mobile  : la coupe passe au-dessus du texte, jamais superposée.
        */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="order-1 lg:order-2">
            <DigesterCutaway />
          </div>

          <div className="order-2 lg:order-1">
            <SectionEyebrow index="03" label="Le digesteur" />
            <RevealText
              text={digester.title}
              className="text-display text-3xl text-ink sm:text-4xl xl:text-5xl"
            />
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-soft xl:text-base">
              {digester.body}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-line">
              {digester.specs.map((s) => (
                <div key={s.id} className="bg-canvas-veil px-3 py-2.5">
                  <dt className="text-[9px] uppercase leading-tight tracking-wide text-ink-mute">
                    {s.label}
                  </dt>
                  <dd className="text-display mt-0.5 text-base text-forest xl:text-lg">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-7 text-[10px] font-medium uppercase tracking-wide text-ink-mute">
              {digester.stagesTitle}
            </h3>

            <ol className="mt-3 space-y-2">
              {digester.stages.map((st) => (
                <li
                  key={st.id}
                  data-stage={st.id}
                  className="rounded-sm border-l-2 border-line-strong py-1 pl-4 opacity-45"
                >
                  <p
                    data-stage-label
                    className="text-[10px] font-medium uppercase tracking-wide text-ink-mute"
                  >
                    {st.index} — {st.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ScrollPanel>
    </section>
  );
}
