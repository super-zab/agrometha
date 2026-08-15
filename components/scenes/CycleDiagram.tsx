import { site } from "@/content/site";

const CX = 210;
const CY = 210;
const R = 138;

function nodePos(i: number) {
  const angle = ((i * 60 - 90) * Math.PI) / 180;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

export function CycleDiagram() {
  const nodes = site.cycle.nodes.map((n, i) => ({ ...n, ...nodePos(i) }));

  return (
    <svg viewBox="0 0 420 420" className="mx-auto h-auto w-full max-w-[min(30rem,62svh)]" aria-hidden>
      <defs>
        <linearGradient id="am-cycle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A7C4E" />
          <stop offset="0.5" stopColor="#12BE85" />
          <stop offset="1" stopColor="#D89A3F" />
        </linearGradient>
      </defs>

      {/* Rail */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#D7E0D4" strokeWidth="1.2" />

      {/* Tracé qui se dessine au scroll */}
      <circle
        data-anim="cycle-path"
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="url(#am-cycle)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Curseur qui parcourt la boucle */}
      <g data-anim="cycle-rotator">
        <circle cx={CX} cy={CY - R} r="12" fill="#12BE85" opacity="0.18" />
        <circle cx={CX} cy={CY - R} r="5" fill="#12BE85" />
      </g>

      {/* Centre */}
      <circle cx={CX} cy={CY} r="56" fill="#FFFFFF" stroke="#D7E0D4" strokeWidth="1" />
      <text
        x={CX}
        y={CY - 2}
        textAnchor="middle"
        fill="#0A0F0C"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-display)"
      >
        AgroMetha
      </text>
      <text
        x={CX}
        y={CY + 16}
        textAnchor="middle"
        fill="#6E7D73"
        fontSize="9.5"
        fontFamily="var(--font-sans)"
      >
        boucle courte
      </text>

      {nodes.map((n) => (
        <g key={n.id} data-anim="cycle-node">
          <circle cx={n.x} cy={n.y} r="21" fill="#FFFFFF" stroke="#4A7C4E" strokeWidth="1.4" />
          <circle cx={n.x} cy={n.y} r="5" fill="#4A7C4E" />
          <text
            x={n.x}
            y={n.y + 40}
            textAnchor="middle"
            fill="#0A0F0C"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-display)"
          >
            {n.label}
          </text>
          <text
            x={n.x}
            y={n.y + 54}
            textAnchor="middle"
            fill="#6E7D73"
            fontSize="9"
            fontFamily="var(--font-sans)"
          >
            {n.detail}
          </text>
        </g>
      ))}
    </svg>
  );
}
