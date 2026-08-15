"use client";

import { site } from "@/content/site";

/** Le méthane qui s'échappe d'un tas de matière abandonné. */
export function WasteStreams() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <svg viewBox="0 0 640 300" className="h-auto max-h-[26svh] w-full" aria-hidden>
        <defs>
          <linearGradient id="am-ch4" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#9E6519" stopOpacity="0.05" />
            <stop offset="1" stopColor="#D89A3F" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="am-heap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C9A882" />
            <stop offset="1" stopColor="#8E7654" />
          </linearGradient>
        </defs>

        {/* Tas de matière organique */}
        <path
          data-anim="heap"
          d="M150 244 C 190 186, 250 172, 300 200 C 340 168, 420 180, 452 244 Z"
          fill="url(#am-heap)"
          opacity="0.55"
        />

        {/* Panaches de CH₄ */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} data-anim="methane">
            <circle
              cx={110 + i * 106}
              cy={196}
              r={13 + (i % 3) * 4}
              fill="url(#am-ch4)"
              className="am-float"
              style={{ animationDelay: `${i * 0.55}s` }}
            />
            <text
              x={110 + i * 106}
              y={200}
              textAnchor="middle"
              fill="#9E6519"
              fontSize="9"
              fontFamily="var(--font-sans)"
            >
              CH₄
            </text>
          </g>
        ))}

        {/* Sol */}
        <path
          data-anim="ground"
          d="M20 252 C 160 236, 240 268, 360 248 S 560 232, 620 256"
          fill="none"
          stroke="#B4C4B2"
          strokeWidth="1.4"
        />
      </svg>

      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {site.problem.streams.map((s) => (
          <li
            key={s.id}
            data-anim="stream"
            className="rounded-sm border border-line bg-surface/70 px-2.5 py-1 text-[10px] uppercase tracking-wide text-ink-mute"
          >
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
