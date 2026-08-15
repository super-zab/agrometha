"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { WasteWord } from "@/components/motion/WasteWord";
import { EnergyWord } from "@/components/motion/EnergyWord";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ScrollHint } from "@/components/chrome/ScrollHint";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Deuxième écran du hero : l'accroche « De déchets à énergie ».
 * Sert de charnière entre la présentation d'AgroMetha et le scroll narratif.
 */
export function Accroche() {
  const { accroche } = site;
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="accroche"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-canvas-alt px-5 py-24 md:px-8"
    >
      <OrganicLines tone="volt" density={3} opacity={0.32} />
      <div
        aria-hidden
        className="halo-volt pointer-events-none absolute right-[8%] top-[38%] h-[50vmin] w-[50vmin] rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionEyebrow index={accroche.index} label={accroche.label} />

        <h2 className="text-display text-ink [font-size:clamp(2.9rem,11.5vw,10.5rem)]">
          <span className="sr-only">
            {accroche.titleBefore} {accroche.wordWaste} {accroche.titleMiddle}{" "}
            {accroche.wordEnergy}
          </span>

          <span aria-hidden className="block">
            <motion.span
              className="inline-block text-ink"
              initial={reduced ? undefined : { opacity: 0, y: 26 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {accroche.titleBefore}&nbsp;
            </motion.span>
            <WasteWord>{accroche.wordWaste}</WasteWord>
          </span>

          <span aria-hidden className="block">
            <motion.span
              className="inline-block text-ink-mute"
              initial={reduced ? undefined : { opacity: 0, y: 26 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {accroche.titleMiddle}&nbsp;
            </motion.span>
            <EnergyWord>{accroche.wordEnergy}</EnergyWord>
          </span>
        </h2>

        <motion.p
          className="mt-10 max-w-prose text-base leading-relaxed text-ink-soft md:mt-12 md:text-lg"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {accroche.body}
        </motion.p>

        <div className="mt-12">
          <ScrollHint label={accroche.scrollLabel} href="#probleme" />
        </div>
      </div>
    </section>
  );
}
