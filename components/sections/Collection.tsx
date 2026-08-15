"use client";

import { useLayoutEffect, useRef } from "react";
import { site } from "@/content/site";
import { SourceMap } from "@/components/scenes/SourceMap";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { gsap, registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Collection() {
  const { collection } = site;
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const setFinal = () => {
        gsap.set("[data-node]", { opacity: 1, scale: 1, y: 0 });
        gsap.set("[data-node-share]", { scaleX: 1 });
        gsap.set("[data-route]", { strokeDashoffset: 0 });
      };

      if (reduced) {
        setFinal();
        return;
      }

      const map = el.querySelector<HTMLElement>("[data-map]");
      if (!map) return;

      // Chaque route est tracée depuis le gisement vers la centrale.
      const routes = gsap.utils.toArray<SVGPathElement>("[data-route]");
      routes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.set("[data-node]", { opacity: 0, scale: 0.82, y: 14 });
      gsap.set("[data-node-share]", { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: map,
          start: "top 78%",
          end: "bottom 65%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.from("[data-anim='hub']", { scale: 0.7, opacity: 0, duration: 0.18 }, 0);

      // Les 5 gisements apparaissent successivement, du plus gros au plus petit.
      collection.sources.forEach((s, i) => {
        const at = 0.14 + i * 0.15;
        tl.to(
          `[data-node='${s.id}']`,
          { opacity: 1, scale: 1, y: 0, duration: 0.14, ease: "back.out(1.5)" },
          at,
        );
        tl.to(`[data-route='${s.id}']`, { strokeDashoffset: 0, duration: 0.2, ease: "none" }, at);
        tl.to(`[data-node-share='${s.id}']`, { scaleX: 1, duration: 0.16 }, at + 0.05);
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, collection.sources]);

  return (
    <section
      id="collecte"
      ref={ref}
      className="relative overflow-hidden bg-canvas-alt px-5 py-28 md:px-8 md:py-36"
    >
      <OrganicLines tone="agro" density={3} opacity={0.24} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow index="02" label="La collecte" />
            <RevealText
              text={collection.title}
              className="text-display max-w-3xl text-4xl text-ink md:text-6xl"
            />
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
              {collection.body}
            </p>
          </div>

          <div className="glass shrink-0 rounded-sm px-6 py-5">
            <p className="text-[10px] uppercase tracking-wide text-ink-mute">
              {collection.totalLabel}
            </p>
            <p className="text-display mt-1 text-4xl text-forest">{collection.totalValue}</p>
          </div>
        </div>

        {/* Carte des 5 gisements autour du site de Péni */}
        <div data-map className="mt-16 lg:mt-20">
          <SourceMap />
        </div>

        {/* Détail de chaque gisement */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-5">
          {collection.sources.map((s) => (
            <li key={s.id} className="bg-canvas-alt p-5">
              <p className="text-display text-xl text-forest">
                {new Intl.NumberFormat("fr-FR").format(s.tons)}
                <span className="ml-1 text-xs font-medium text-ink-mute">t/an</span>
              </p>
              <h3 className="text-display mt-2 text-base text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
