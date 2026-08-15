"use client";

import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { OrganicLines } from "@/components/scenes/OrganicLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";

export function Project() {
  const { project } = site;

  return (
    <section
      id="projet"
      className="relative overflow-hidden bg-canvas-alt px-5 py-28 md:px-8 md:py-36"
    >
      <OrganicLines tone="agro" density={2} opacity={0.2} />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <div>
          <SectionEyebrow index="09" label="AgroMetha" />
          <RevealText
            text={project.title}
            className="text-display text-4xl text-ink md:text-6xl"
          />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{project.mission}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{project.vision}</p>

          <div className="glass mt-10 flex items-start gap-3 rounded-sm p-5">
            <MapPin size={18} className="mt-0.5 shrink-0 text-agro" />
            <div>
              <p className="text-display text-xl text-ink">{project.location.city}</p>
              <p className="text-sm text-ink-soft">
                {project.location.region} · {project.location.country}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-agro">
                {project.location.detail} · {project.location.surface}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-3">
            {project.milestones.map((m) => (
              <li key={m.id} className="bg-canvas-alt px-4 py-4">
                <p className="text-[10px] uppercase tracking-wide text-ink-mute">{m.label}</p>
                <p className="text-display mt-1 text-xl text-forest">
                  {m.value}
                  <ConfirmBadge confirmed={m.confirmed} />
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <ProjectVisual />
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-ink-mute">
              {project.partnersTitle}
            </h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {project.partners.map((p) => (
                <li
                  key={p.name}
                  className="flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-surface/50"
                >
                  <span className="text-display text-lg text-ink">
                    {p.name}
                    <ConfirmBadge confirmed={p.confirmed} />
                  </span>
                  <span className="text-right text-xs text-ink-mute">{p.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
