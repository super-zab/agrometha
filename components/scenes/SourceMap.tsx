"use client";

import type { LucideIcon } from "lucide-react";
import { Beef, Beer, CupSoda, Store, Wheat } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
  beer: Beer,
  store: Store,
  juice: CupSoda,
  wheat: Wheat,
  beef: Beef,
};

/**
 * Positions des 5 gisements autour du site de Péni, réparties tous les 72°
 * sur une ellipse (rx 360 / ry 225 dans un repère 1000 × 625).
 * L'ordre suit celui de `site.collection.sources`, du plus gros gisement au plus petit.
 */
const NODES = [
  { x: 50, y: 13.6 },
  { x: 84.2, y: 38.5 },
  { x: 71.2, y: 78.7 },
  { x: 28.8, y: 78.7 },
  { x: 15.8, y: 38.5 },
];

const CENTER = { x: 500, y: 310 };

export function SourceMap() {
  const { collection } = site;
  const sources = collection.sources;

  return (
    <div className="relative w-full">
      {/* ---------- Carte (desktop) ---------- */}
      <div className="relative mx-auto hidden aspect-[16/10] w-full max-w-4xl lg:block">
        <svg
          viewBox="0 0 1000 625"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="am-map-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#12BE85" stopOpacity="0.16" />
              <stop offset="1" stopColor="#12BE85" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx={CENTER.x} cy={CENTER.y} rx="300" ry="188" fill="url(#am-map-glow)" />

          {/* Rayon de collecte de 40 km */}
          <ellipse
            cx={CENTER.x}
            cy={CENTER.y}
            rx="360"
            ry="225"
            fill="none"
            stroke="#B4C4B2"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <ellipse
            cx={CENTER.x}
            cy={CENTER.y}
            rx="215"
            ry="134"
            fill="none"
            stroke="#D7E0D4"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

          {/* Routes de collecte : chaque gisement vers la centrale */}
          {sources.map((s, i) => {
            const nx = (NODES[i].x / 100) * 1000;
            const ny = (NODES[i].y / 100) * 625;
            const mx = (nx + CENTER.x) / 2 + (i % 2 === 0 ? 26 : -26);
            const my = (ny + CENTER.y) / 2 + (i % 2 === 0 ? -20 : 20);
            return (
              <path
                key={s.id}
                data-route={s.id}
                d={`M${nx} ${ny} Q ${mx} ${my} ${CENTER.x} ${CENTER.y}`}
                fill="none"
                stroke="#4A7C4E"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.55"
              />
            );
          })}
        </svg>

        {/* Centrale de Péni */}
        <div
          data-anim="hub"
          className="glass absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
        >
          <span className="text-display text-base text-forest">
            {collection.centerLabel}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-ink-mute">
            {collection.centerSub}
          </span>
          <span className="text-display mt-1 text-sm text-volt-deep">
            {collection.totalValue}
          </span>
          <span
            aria-hidden
            className="am-pulse absolute inset-[-12px] rounded-full border border-dashed border-agro/40"
          />
        </div>

        {/* Les 5 gisements */}
        {sources.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <article
              key={s.id}
              data-node={s.id}
              className="glass absolute w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-sm px-3.5 py-3"
              style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-line text-agro">
                  {Icon ? <Icon size={15} strokeWidth={1.6} /> : null}
                </span>
                <span className="text-display text-lg leading-none text-forest">
                  {new Intl.NumberFormat("fr-FR").format(s.tons)}
                  <span className="ml-1 text-[10px] font-medium text-ink-mute">t/an</span>
                </span>
              </div>
              <p className="text-display mt-2.5 text-[13px] leading-tight text-ink">
                {s.title}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  data-node-share={s.id}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-agro to-volt"
                  style={{ width: `${s.share}%` }}
                />
              </div>
              <p className="mt-1.5 text-[9px] uppercase tracking-wide text-ink-mute">
                {s.share} % du gisement
              </p>
            </article>
          );
        })}

        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wide text-ink-mute">
          {collection.radiusLabel} · {collection.radiusValue}
        </p>
      </div>

      {/* ---------- Repli mobile / tablette : même contenu, empilé ---------- */}
      <div className="lg:hidden">
        <div
          data-anim="hub"
          className="glass mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full text-center"
        >
          <span className="text-display text-sm text-forest">{collection.centerLabel}</span>
          <span className="text-[10px] uppercase tracking-wide text-ink-mute">
            {collection.centerSub}
          </span>
          <span className="text-display text-xs text-volt-deep">
            {collection.totalValue}
          </span>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-wide text-ink-mute">
          {collection.radiusLabel} · {collection.radiusValue}
        </p>

        <ul className="mt-8 space-y-3">
          {sources.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li
                key={s.id}
                data-node={s.id}
                className={cn("glass-line flex items-center gap-3 rounded-sm px-4 py-3")}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line text-agro">
                  {Icon ? <Icon size={16} strokeWidth={1.6} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-display block text-[13px] leading-tight text-ink">
                    {s.title}
                  </span>
                  <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-line">
                    <span
                      data-node-share={s.id}
                      className="block h-full origin-left rounded-full bg-gradient-to-r from-agro to-volt"
                      style={{ width: `${s.share}%` }}
                    />
                  </span>
                </span>
                <span className="text-display shrink-0 text-right text-lg leading-none text-forest">
                  {new Intl.NumberFormat("fr-FR").format(s.tons)}
                  <span className="ml-1 text-[10px] font-medium text-ink-mute">t/an</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
