/**
 * Réseau électrique + foyers qui s'allument.
 *
 * L'ancienne version faisait bien passer 24 fenêtres de `#E4EDE2` à `#5FE0B0`,
 * mais l'effet était imperceptible : pas de halo, contraste faible, et un SVG
 * bridé à 58svh. Ici les fenêtres passent à une lumière chaude, chaque bâtiment
 * gagne un halo qui monte, et une impulsion descend de la ligne vers le toit.
 *
 * Convention de couleur : le courant est émeraude (`volt`), la lumière rendue
 * aux foyers est chaude (`amber-soft`) — c'est ce contraste qui rend l'idée
 * « l'électricité produite éclaire des maisons » lisible d'un coup d'œil.
 */

/** 5 bâtiments : x, largeur, hauteur, colonnes × rangées de fenêtres. */
const BUILDINGS = [
  { x: 70, w: 108, h: 132, cols: 2, rows: 3 },
  { x: 208, w: 128, h: 186, cols: 3, rows: 4 },
  { x: 366, w: 116, h: 150, cols: 2, rows: 3 },
  { x: 512, w: 140, h: 204, cols: 3, rows: 5 },
  { x: 682, w: 112, h: 142, cols: 2, rows: 3 },
];

const GROUND = 372;
const LINE_Y = 96;

export function PowerGrid() {
  let windowIndex = 0;

  return (
    <svg viewBox="0 0 880 400" className="h-auto max-h-[34svh] w-full" aria-hidden>
      <defs>
        <linearGradient id="am-grid-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#12BE85" />
          <stop offset="1" stopColor="#0A8C61" />
        </linearGradient>
        <radialGradient id="am-home-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F0C87A" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#EFC98D" stopOpacity="0.18" />
          <stop offset="1" stopColor="#EFC98D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- Ligne haute tension : rail éteint puis tracé qui se dessine --- */}
      <path
        d={`M36 ${LINE_Y} H844 M36 ${LINE_Y} V44 M238 ${LINE_Y} V56 M440 ${LINE_Y} V32 M642 ${LINE_Y} V54 M844 ${LINE_Y} V40`}
        fill="none"
        stroke="#D7E0D4"
        strokeWidth="1.6"
      />
      <path
        data-anim="grid"
        d={`M36 ${LINE_Y} H844 M36 ${LINE_Y} V44 M238 ${LINE_Y} V56 M440 ${LINE_Y} V32 M642 ${LINE_Y} V54 M844 ${LINE_Y} V40`}
        fill="none"
        stroke="url(#am-grid-line)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Point d'injection */}
      <circle data-anim="spark-halo" cx="36" cy={LINE_Y} r="15" fill="#12BE85" opacity="0.18" />
      <circle data-anim="spark" cx="36" cy={LINE_Y} r="5.5" fill="#12BE85" />
      <text x="26" y={LINE_Y + 26} fill="#0A8C61" fontSize="11" fontFamily="var(--font-sans)">
        Injection SONABEL
      </text>

      {/* --- Foyers --- */}
      {BUILDINGS.map((b, bi) => {
        const top = GROUND - b.h;
        const cx = b.x + b.w / 2;
        const gapX = b.w / (b.cols + 1);
        const winW = Math.min(24, gapX * 0.62);
        const usableH = b.h - 46;
        const gapY = usableH / (b.rows + 1);
        const winH = Math.min(22, gapY * 0.62);

        return (
          <g key={bi}>
            {/* Halo de lumière qui monte du bâtiment */}
            <ellipse
              data-anim="home-glow"
              cx={cx}
              cy={top + b.h * 0.45}
              rx={b.w * 1.05}
              ry={b.h * 0.72}
              fill="url(#am-home-glow)"
              opacity="0"
            />

            {/* Descente depuis la ligne vers le toit */}
            <path
              data-anim="drop"
              d={`M${cx} ${LINE_Y} V ${top}`}
              fill="none"
              stroke="#12BE85"
              strokeWidth="1.6"
              strokeDasharray="5 9"
              opacity="0.2"
            />

            <rect
              x={b.x}
              y={top}
              width={b.w}
              height={b.h}
              rx="3"
              fill="#FFFFFF"
              stroke="#14372A"
              strokeWidth="1.4"
            />

            {Array.from({ length: b.rows }).map((_, r) =>
              Array.from({ length: b.cols }).map((_, c) => {
                const i = windowIndex++;
                return (
                  <rect
                    key={`${r}-${c}`}
                    data-anim="window"
                    data-window={i}
                    x={b.x + gapX * (c + 1) - winW / 2}
                    y={top + 30 + gapY * r}
                    width={winW}
                    height={winH}
                    rx="1.5"
                    fill="#E4EDE2"
                    stroke="#C3D2C1"
                    strokeWidth="0.8"
                  />
                );
              }),
            )}
          </g>
        );
      })}

      {/* Sol */}
      <path
        d={`M20 ${GROUND} H860`}
        stroke="#B4C4B2"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="440"
        y={GROUND + 22}
        textAnchor="middle"
        fill="#6E7D73"
        fontSize="11"
        fontFamily="var(--font-sans)"
      >
        1,5 GWh/an injectés sur le réseau local
      </text>
    </svg>
  );
}
