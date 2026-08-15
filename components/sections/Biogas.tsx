"use client";

import { site } from "@/content/site";
import { BiogasFlow } from "@/components/scenes/BiogasFlow";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

export function Biogas() {
  const { biogas } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 210,
    reducedState: (el) => {
      el.querySelectorAll<SVGPathElement>("[data-anim='pipe-1'], [data-anim='pipe-2']").forEach(
        (p) => gsap.set(p, { strokeDasharray: p.getTotalLength(), strokeDashoffset: 0 }),
      );
      gsap.set("[data-anim='chp-glow']", { opacity: 1 });
      gsap.set("[data-anim='mixbar']", { scaleX: 1 });
    },
    /*
     * Séquence VALIDÉE — reprise à l'identique, seules les durées ont été
     * explicitées pour que la timeline reste normalisée à 1.
     */
    build: (tl, el) => {
      el.querySelectorAll<SVGPathElement>("[data-anim='pipe-1'], [data-anim='pipe-2']").forEach(
        (p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        },
      );

      tl.from("[data-anim='node-dome']", { opacity: 0.35, duration: 0.16 }, 0);
      tl.to(
        "[data-anim='bubble']",
        { y: -46, opacity: 0, duration: 0.24, stagger: 0.05, ease: "none" },
        0.04,
      );
      tl.to("[data-anim='pipe-1']", { strokeDashoffset: 0, duration: 0.2, ease: "none" }, 0.14);
      tl.from("[data-anim='node-gas']", { opacity: 0.25, y: 18, duration: 0.14 }, 0.34);
      tl.to(
        "[data-anim='gas-fill']",
        { opacity: 0.62, scaleY: 1.12, transformOrigin: "center bottom", duration: 0.18 },
        0.44,
      );
      tl.to("[data-anim='pipe-2']", { strokeDashoffset: 0, duration: 0.2, ease: "none" }, 0.54);
      tl.from("[data-anim='node-chp']", { opacity: 0.25, y: 18, duration: 0.14 }, 0.72);
      tl.to("[data-anim='chp-glow']", { opacity: 1, duration: 0.14 }, 0.8);
      tl.fromTo(
        "[data-anim='mixbar']",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.16, stagger: 0.08, ease: "power2.out" },
        0.62,
      );
    },
  });

  return (
    <section id="biogaz" ref={ref} className="relative bg-canvas">
      <ScrollPanel>
        {/* En-tête compact */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow index="04" label="Le biogaz" className="mb-3" />
            <RevealText
              text={biogas.title}
              className="text-display text-3xl text-ink sm:text-4xl xl:text-5xl"
            />
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft xl:text-base">
              {biogas.body}
            </p>
          </div>

          <div className="glass shrink-0 rounded-sm px-5 py-3.5">
            <p className="text-[10px] uppercase tracking-wide text-ink-mute">
              {biogas.volume.label}
            </p>
            <p className="text-display mt-0.5 text-2xl text-amber-deep xl:text-3xl">
              <AnimatedCounter value={biogas.volume.value} suffix={biogas.volume.suffix} />
            </p>
          </div>
        </div>

        {/* Scène : digesteur → gazomètre → cogénération */}
        <div className="mt-5 xl:mt-7">
          <div className="mx-auto max-w-5xl">
            <BiogasFlow />
          </div>
        </div>

        {/* Composition + étapes, côte à côte pour tenir sur un écran */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:mt-7">
          <div className="grid gap-3 sm:grid-cols-2">
            {biogas.mix.map((m) => (
              <div key={m.id} className="rounded-sm border border-line bg-surface/60 p-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-display text-sm text-ink">{m.label}</h3>
                  <span className="text-display text-lg text-forest">~{m.share} %</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    data-anim="mixbar"
                    className={
                      m.id === "ch4"
                        ? "h-full origin-left rounded-full bg-gradient-to-r from-amber to-amber-deep"
                        : "h-full origin-left rounded-full bg-line-strong"
                    }
                    style={{ width: `${m.share}%` }}
                  />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {biogas.steps.map((s) => (
              <div key={s.id} className="border-t border-line pt-3">
                <h3 className="text-display text-sm text-ink">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollPanel>
    </section>
  );
}
