export function FieldBloom() {
  return (
    <svg viewBox="0 0 760 300" className="h-auto max-h-[26svh] w-full" aria-hidden>
      <defs>
        <linearGradient id="am-soil-rich" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A7C4E" />
          <stop offset="1" stopColor="#14372A" />
        </linearGradient>
      </defs>

      {/* Sol pauvre, puis sol enrichi par le digestat */}
      <path d="M0 214 Q190 182 380 214 T760 214 V300 H0 Z" fill="#DCD6C6" />
      <path
        data-anim="soil"
        d="M0 214 Q190 182 380 214 T760 214 V300 H0 Z"
        fill="url(#am-soil-rich)"
        opacity="0"
      />

      {/* Épandage du digestat */}
      <g data-anim="digestate">
        <rect x="52" y="198" width="92" height="16" rx="8" fill="#9E6519" opacity="0.55" />
        <text x="98" y="188" textAnchor="middle" fill="#9E6519" fontSize="10" fontFamily="var(--font-sans)">
          digestat
        </text>
      </g>

      {/* Cultures */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = 42 + i * 48;
        const h = 44 + (i % 4) * 20;
        return (
          <g key={i} data-anim="stalk" style={{ transformOrigin: `${x}px 214px` }}>
            <path
              d={`M${x} 214 C ${x - 9} ${214 - h / 2}, ${x + 11} ${214 - h + 11}, ${x} ${214 - h}`}
              fill="none"
              stroke="#14372A"
              strokeWidth="2"
            />
            <ellipse cx={x + 9} cy={214 - h + 5} rx="11" ry="5.5" fill="#4A7C4E" />
            <ellipse cx={x - 8} cy={214 - h + 20} rx="9" ry="4.5" fill="#7BA97D" />
          </g>
        );
      })}
    </svg>
  );
}
