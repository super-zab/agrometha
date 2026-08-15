"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

type Props = {
  label: string;
  href?: string;
};

export function ScrollHint({ label, href = "#probleme" }: Props) {
  return (
    <a
      href={href}
      data-cursor="hover"
      className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-wide text-ink-mute transition-colors hover:text-forest"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-volt">
        <motion.span
          className="absolute inset-0 rounded-full bg-volt/10"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="relative text-forest"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.8} />
        </motion.span>
      </span>
      <span>{label}</span>
    </a>
  );
}
