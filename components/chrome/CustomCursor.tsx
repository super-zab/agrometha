"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let hover = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      hover = Boolean(t?.closest("a, button, [data-cursor='hover']"));
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      }
      if (ring.current) {
        const s = hover ? 1.7 : 1;
        ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${s})`;
        ring.current.style.borderColor = hover ? "#12BE85" : "#B4C4B2";
        ring.current.style.boxShadow = hover
          ? "0 0 22px -4px rgba(18,190,133,0.55)"
          : "none";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1 w-1 rounded-full bg-forest md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-line-strong transition-[border-color,box-shadow] duration-200 md:block"
      />
    </>
  );
}
