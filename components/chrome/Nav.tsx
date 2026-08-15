"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#hero" data-cursor="hover" aria-label="AgroMetha — accueil">
          <Logo />
        </a>
        <a
          href={site.nav.ctaHref}
          data-cursor="hover"
          className="rounded-sm border border-forest/25 bg-surface/70 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-forest transition-all hover:border-volt hover:text-volt-deep hover:shadow-glow-volt"
        >
          {site.nav.cta}
        </a>
      </div>
    </header>
  );
}
