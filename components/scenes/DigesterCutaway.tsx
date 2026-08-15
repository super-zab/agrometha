"use client";

import { site } from "@/content/site";

const STAGES = site.digester.stages;

/** Bandes de digestion, du bas (hydrolyse) vers le haut (méthanogenèse). */
const ZONES = [
  { y: 372, h: 74 },
  { y: 298, h: 74 },
  { y: 224, h: 74 },
  { y: 150, h: 74 },
];

const BUBBLES = [
  { cx: 128, cy: 356, r: 5 },
  { cx: 172, cy: 388, r: 3.5 },
  { cx: 214, cy: 344, r: 6 },
  { cx: 152, cy: 300, r: 4 },
  { cx: 236, cy: 296, r: 3 },
  { cx: 190, cy: 252, r: 5.5 },
  { cx: 128, cy: 244, r: 3.5 },
  { cx: 246, cy: 216, r: 4.5 },
  { cx: 166, cy: 200, r: 3 },
];

export function DigesterCutaway() {
  return (
    <div className="relative mx-auto w-full max-w-[min(440px,54svh)]">
      {/* Halo de lumière derrière la cuve — le digesteur est le point focal. */}
      <div
        aria-hidden
        className="halo-agro pointer-events-none absolute inset-[-14%] rounded-full blur-2xl"
      />

      <svg
        viewBox="0 0 420 560"
        className="relative h-auto w-full"
        role="img"
        aria-label="Coupe d’un digesteur anaérobie de 2 500 m³ : la matière entre à gauche, le biogaz est capté au sommet, le digestat sort à droite."
      >
        <defs>
          <clipPath id="am-tank-clip">
            <path d="M84 150 h252 a22 22 0 0 1 22 22 v252 a88 42 0 0 1 -296 0 v-252 a22 22 0 0 1 22 -22 z" />
          </clipPath>

          <linearGradient id="am-slurry" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#4A7C4E" />
            <stop offset="0.55" stopColor="#7BA97D" />
            <stop offset="1" stopColor="#CFE0CC" />
          </linearGradient>

          <radialGradient id="am-gaspocket" cx="50%" cy="55%" r="65%">
            <stop offset="0" stopColor="#D89A3F" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#D89A3F" stopOpacity="0.18" />
            <stop offset="1" stopColor="#D89A3F" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="am-gasline" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#D89A3F" />
            <stop offset="1" stopColor="#12BE85" />
          </linearGradient>
        </defs>

        {/* ---- Arrivée de matière ------------------------------------------ */}
        <g data-anim="inlet">
          <path d="M14 214 H84" fill="none" stroke="#B4C4B2" strokeWidth="7" strokeLinecap="round" />
          <path d="M14 214 H84" fill="none" stroke="#F7F8F4" strokeWidth="3" strokeLinecap="round" />
          <text x="14" y="200" fill="#6E7D73" fontSize="11" fontFamily="var(--font-sans)">
            Intrants
          </text>
          <text x="14" y="238" fill="#9E6519" fontSize="10" fontFamily="var(--font-sans)">
            12 600 t/an
          </text>
        </g>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            data-anim="inlet-matter"
            x={16 + i * 18}
            y={210}
            width="9"
            height="9"
            rx="1.5"
            fill="#9E6519"
            opacity="0"
          />
        ))}

        {/* ---- Cuve --------------------------------------------------------- */}
        <path
          d="M84 150 h252 a22 22 0 0 1 22 22 v252 a88 42 0 0 1 -296 0 v-252 a22 22 0 0 1 22 -22 z"
          fill="#FFFFFF"
          stroke="#14372A"
          strokeWidth="1.6"
        />

        <g clipPath="url(#am-tank-clip)">
          {/* Substrat qui monte */}
          <rect data-anim="fill" x="60" y="452" width="300" height="330" fill="url(#am-slurry)" />

          {/* Les quatre étapes biologiques, empilées */}
          {ZONES.map((z, i) => (
            <g key={STAGES[i].id} data-zone={STAGES[i].id} opacity="0">
              <rect
                x="62"
                y={z.y}
                width="296"
                height={z.h}
                fill="#12BE85"
                opacity="0.14"
              />
              <line
                x1="62"
                x2="358"
                y1={z.y}
                y2={z.y}
                stroke="#12BE85"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.7"
              />
              <text
                x="98"
                y={z.y + 20}
                fill="#0A8C61"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-display)"
              >
                {STAGES[i].index}
              </text>
            </g>
          ))}

          {/* Bulles de biogaz */}
          {BUBBLES.map((b, i) => (
            <circle
              key={i}
              data-anim="bubble"
              cx={b.cx}
              cy={b.cy}
              r={b.r}
              fill="none"
              stroke="#9E6519"
              strokeWidth="1.2"
              opacity="0"
            />
          ))}
        </g>

        {/* ---- Ciel de cuve + dôme ------------------------------------------ */}
        <ellipse
          data-anim="gaspocket"
          cx="210"
          cy="132"
          rx="112"
          ry="52"
          fill="url(#am-gaspocket)"
          opacity="0"
        />
        <path d="M84 150 Q210 34 336 150" fill="#FFFFFF" fillOpacity="0.9" stroke="#14372A" strokeWidth="1.6" />
        <path
          data-anim="dome-arc"
          d="M84 150 Q210 34 336 150"
          fill="none"
          stroke="#D89A3F"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0"
        />

        {/* ---- Sortie biogaz ------------------------------------------------ */}
        <path
          data-anim="gasline"
          d="M210 62 V28 H336"
          fill="none"
          stroke="url(#am-gasline)"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.2"
        />
        <circle data-anim="gasdot" cx="210" cy="62" r="5" fill="#D89A3F" opacity="0" />
        <text x="344" y="24" fill="#9E6519" fontSize="11" fontFamily="var(--font-sans)">
          Biogaz
        </text>
        <text x="344" y="40" fill="#6E7D73" fontSize="10" fontFamily="var(--font-sans)">
          660 000 Nm³/an
        </text>

        {/* ---- Sortie digestat ---------------------------------------------- */}
        <g data-anim="outlet" opacity="0.25">
          <path d="M336 424 H404" fill="none" stroke="#4A7C4E" strokeWidth="7" strokeLinecap="round" />
          <path d="M336 424 H404" fill="none" stroke="#CFE0CC" strokeWidth="3" strokeLinecap="round" />
          <text x="330" y="410" fill="#6E7D73" fontSize="11" fontFamily="var(--font-sans)">
            Digestat
          </text>
          <text x="330" y="448" fill="#4A7C4E" fontSize="10" fontFamily="var(--font-sans)">
            10 000 t/an
          </text>
        </g>

        {/* ---- Cotes -------------------------------------------------------- */}
        <g stroke="#B4C4B2" strokeWidth="1" fill="none">
          <path d="M52 150 V466" strokeDasharray="3 5" />
          <path d="M46 150 H58" />
          <path d="M46 466 H58" />
        </g>
        <text
          x="34"
          y="316"
          fill="#6E7D73"
          fontSize="11"
          fontFamily="var(--font-sans)"
          textAnchor="middle"
          transform="rotate(-90 34 316)"
        >
          2 500 m³ · 45–60 j
        </text>
      </svg>
    </div>
  );
}
