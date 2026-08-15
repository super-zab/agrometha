"use client";

import { site } from "@/content/site";
import { WasteStreams } from "@/components/scenes/WasteStreams";
import { ScrollPanel } from "@/components/motion/ScrollPanel";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { usePinnedScene } from "@/hooks/usePinnedScene";
import { gsap } from "@/lib/gsap";

export function Problem() {
  const { problem } = site;

  const ref = usePinnedScene<HTMLElement>({
    length: 170,
    reducedState: () => {
      gsap.set("[data-anim='pain']", { opacity: 1, y: 0 });
      gsap.set("[data-anim='heap']", { scaleY: 1, opacity: 1 });
      gsap.set("[data-anim='methane']", { opacity: 1, y: 0 });
      gsap.set("[data-anim='stream']", { opacity: 1, y: 0 });
      gsap.set("[data-anim='multiplier']", { opacity: 1, scale: 1 });
    },
    // Positions ∈ [0, 1] = progression du scroll dans le pin.
    build: (tl) => {
      tl.from(
        "[data-anim='pain']",
        { opacity: 0, y: 40, duration: 0.2, stagger: 0.07, ease: "power2.out" },
        0,
      );
      tl.from(
        "[data-anim='heap']",
        { scaleY: 0.3, opacity: 0.15, transformOrigin: "center bottom", duration: 0.28 },
        0.22,
      );
      tl.from(
        "[data-anim='methane']",
        { y: 52, opacity: 0, duration: 0.26, stagger: 0.05 },
        0.34,
      );
      tl.from(
        "[data-anim='stream']",
        { opacity: 0, y: 18, duration: 0.16, stagger: 0.045 },
        0.56,
      );
      tl.from(
        "[data-anim='multiplier']",
        { scale: 0.72, opacity: 0, transformOrigin: "left center", duration: 0.2 },
        0.76,
      );
    },
  });

  return (
    <section id="probleme" ref={ref} className="relative bg-canvas">
      <ScrollPanel>
        <SectionEyebrow index="01" label="Le constat" />
        <RevealText
          text={problem.title}
          className="text-display max-w-4xl text-3xl text-ink sm:text-4xl md:text-5xl xl:text-6xl"
        />
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft xl:text-lg">
          {problem.body}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:mt-10">
          {/* Les trois constats chiffrés */}
          <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-3 lg:grid-cols-1">
            {problem.pains.map((p) => (
              <li
                key={p.id}
                data-anim="pain"
                className="bg-canvas p-4 lg:flex lg:items-baseline lg:gap-5 xl:p-5"
              >
                <p className="text-display shrink-0 text-2xl text-amber-deep lg:w-32 xl:text-3xl">
                  {p.stat}
                </p>
                <div className="mt-2 lg:mt-0">
                  <h3 className="text-display text-base text-ink xl:text-lg">{p.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Illustration CH₄ — l'espace au-dessus a été réduit de moitié (mt-20 → mt-10) */}
          <div className="mt-10 lg:mt-0">
            <WasteStreams />

            <div className="mt-6 flex items-end gap-5 border-t border-line pt-5">
              <p
                data-anim="multiplier"
                className="text-display shrink-0 text-4xl text-amber xl:text-5xl"
                style={{ textShadow: "0 0 42px rgba(216,154,63,0.35)" }}
              >
                {problem.highlight.fact}
              </p>
              <p className="text-[13px] leading-relaxed text-ink-soft">
                {problem.highlight.label}
              </p>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </section>
  );
}
