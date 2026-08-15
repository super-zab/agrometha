"use client";

import { useLayoutEffect } from "react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    registerGsap();
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    // Les titres display changent de métrique une fois la police chargée :
    // sans ce refresh, tous les triggers sont calés sur la mauvaise hauteur.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    const t = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return <>{children}</>;
}
