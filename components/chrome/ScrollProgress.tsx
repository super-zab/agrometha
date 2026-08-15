"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  // `active` ne change qu'au franchissement d'une section : un state React est
  // ici légitime. La progression, elle, change à chaque pixel → jamais en state.
  const [active, setActive] = useState<string>(site.nav.sections[0].id);

  useEffect(() => {
    let raf = 0;
    let queued = false;

    /*
     * PERF : la barre est écrite directement dans le DOM, dans une frame rAF.
     * Avant, `setProgress()` était appelé à chaque événement scroll et
     * re-rendait la liste des 12 sections à chaque frame — c'était l'un des
     * principaux postes de saccade.
     */
    const paint = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const els = site.nav.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <aside
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-hidden
    >
      <div className="pointer-events-auto relative h-[46vh] w-px bg-line">
        <div
          ref={bar}
          className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-agro to-volt"
          style={{ transform: "scaleY(0)" }}
        />
        <ul className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 flex-col justify-between">
          {site.nav.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-cursor="hover"
                title={s.label}
                className="group relative flex h-3 w-3 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-1.5 w-1.5 rounded-full border transition-all duration-300",
                    active === s.id
                      ? "scale-[1.6] border-volt bg-volt shadow-glow-volt"
                      : "border-line-strong bg-canvas",
                  )}
                />
                <span className="glass pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm px-2 py-1 text-[10px] uppercase tracking-wide text-forest opacity-0 transition-opacity group-hover:opacity-100">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
