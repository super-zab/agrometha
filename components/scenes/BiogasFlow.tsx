export function BiogasFlow() {
  return (
    <svg viewBox="0 0 760 300" className="h-auto max-h-[30svh] w-full" aria-hidden>
      <defs>
        <linearGradient id="am-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D89A3F" />
          <stop offset="1" stopColor="#12BE85" />
        </linearGradient>
        <radialGradient id="am-chp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#12BE85" stopOpacity="0.42" />
          <stop offset="1" stopColor="#12BE85" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- Digesteur --- */}
      <g data-anim="node-dome">
        <rect x="34" y="128" width="120" height="96" rx="8" fill="#FFFFFF" stroke="#14372A" strokeWidth="1.5" />
        <path d="M34 128 Q94 62 154 128" fill="#FFFFFF" stroke="#14372A" strokeWidth="1.5" />
        <rect x="42" y="176" width="104" height="42" rx="4" fill="#CFE0CC" />
        <text x="94" y="248" textAnchor="middle" fill="#0A0F0C" fontSize="12" fontFamily="var(--font-display)" fontWeight="700">
          Digesteur
        </text>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            data-anim="bubble"
            cx={62 + i * 22}
            cy={150}
            r="3.5"
            fill="none"
            stroke="#9E6519"
            strokeWidth="1.2"
            opacity="0.8"
          />
        ))}
      </g>

      <path
        data-anim="pipe-1"
        d="M154 104 C 220 104, 250 104, 300 104"
        fill="none"
        stroke="url(#am-pipe)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* --- Gazomètre --- */}
      <g data-anim="node-gas">
        <rect x="300" y="64" width="108" height="132" rx="54" fill="#FFFFFF" stroke="#D89A3F" strokeWidth="1.6" />
        <rect
          data-anim="gas-fill"
          x="312"
          y="106"
          width="84"
          height="78"
          rx="42"
          fill="#D89A3F"
          opacity="0.22"
        />
        <text x="354" y="222" textAnchor="middle" fill="#0A0F0C" fontSize="12" fontFamily="var(--font-display)" fontWeight="700">
          Gazomètre
        </text>
        <text x="354" y="240" textAnchor="middle" fill="#6E7D73" fontSize="10" fontFamily="var(--font-sans)">
          tampon de stockage
        </text>
      </g>

      <path
        data-anim="pipe-2"
        d="M408 104 C 480 104, 512 150, 572 160"
        fill="none"
        stroke="url(#am-pipe)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* --- Cogénération --- */}
      <g data-anim="node-chp">
        <circle cx="618" cy="162" r="70" fill="url(#am-chp-glow)" data-anim="chp-glow" opacity="0" />
        <rect x="572" y="126" width="150" height="80" rx="6" fill="#FFFFFF" stroke="#14372A" strokeWidth="1.5" />
        <circle cx="606" cy="166" r="17" fill="none" stroke="#12BE85" strokeWidth="2" />
        <circle cx="606" cy="166" r="4.5" fill="#12BE85" className="am-pulse" />
        <text x="636" y="162" fill="#0A0F0C" fontSize="13" fontFamily="var(--font-display)" fontWeight="700">
          CHP
        </text>
        <text x="636" y="180" fill="#6E7D73" fontSize="9.5" fontFamily="var(--font-sans)">
          cogénération
        </text>
        <text x="647" y="248" textAnchor="middle" fill="#0A8C61" fontSize="11" fontFamily="var(--font-sans)">
          250 kW
        </text>
      </g>
    </svg>
  );
}
