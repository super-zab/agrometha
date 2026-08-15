"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { OrganicParticles } from "@/components/scenes/OrganicParticles";
import { ScrollHint } from "@/components/chrome/ScrollHint";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const { hero } = site;
  const reduced = usePrefersReducedMotion();
  const letters = Array.from(hero.wordmark);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden bg-veil-radial px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32"
    >
      <OrganicLines className="opacity-60" tone="agro" opacity={0.55} />
      <OrganicParticles />

      {/* Halos de lumière, très diffus. */}
      <div
        aria-hidden
        className="halo-volt pointer-events-none absolute -right-24 top-1/4 h-[46vmin] w-[46vmin] rounded-full blur-2xl"
      />
      <div
        aria-hidden
        className="halo-amber pointer-events-none absolute -left-32 bottom-0 h-[38vmin] w-[38vmin] rounded-full blur-2xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <motion.p
          {...fade(0.05)}
          className="mb-5 text-[10px] font-medium uppercase tracking-wide text-agro md:text-[11px]"
        >
          {hero.eyebrow}
        </motion.p>

        {/* Nom de l'entreprise, display condensé plein cadre. */}
        <h1 className="text-display text-ink [font-size:clamp(3.4rem,14.5vw,13rem)]">
          <span className="sr-only">{hero.wordmark}</span>
          <span aria-hidden className="block">
            {letters.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block"
                initial={reduced ? undefined : { y: "108%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.1 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          {...fade(0.5)}
          aria-hidden
          className="mt-7 h-px w-full bg-gradient-to-r from-forest via-line to-transparent md:mt-9"
        />

        <div className="mt-8 grid gap-8 md:mt-11 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <motion.div {...fade(0.6)}>
            <p className="text-display text-2xl text-forest sm:text-3xl md:text-[2.4rem]">
              {hero.positioningLead}
            </p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-soft md:text-lg">
              {hero.positioning}
            </p>
          </motion.div>

          <motion.div {...fade(0.72)} className="flex flex-col justify-between gap-7">
            <p className="glass max-w-prose rounded-sm px-5 py-4 text-sm leading-relaxed text-ink-soft md:text-base">
              {hero.pedagogy}
            </p>

            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-3">
              {hero.keyFigures.map((f) => (
                <li key={f.value} className="bg-canvas/90 px-4 py-3.5">
                  <p className="text-display text-xl text-forest md:text-2xl">{f.value}</p>
                  <p className="mt-1 text-[10px] uppercase leading-snug tracking-wide text-ink-mute">
                    {f.label}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...fade(0.95)}
        className="relative z-10 mx-auto mt-10 w-full max-w-7xl"
      >
        <ScrollHint label={hero.scrollLabel} href="#accroche" />
      </motion.div>
    </section>
  );
}
