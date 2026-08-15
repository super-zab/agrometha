import Image from "next/image";
import { projectPhoto, site } from "@/content/site";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Visuel de la section « Le projet ».
 *
 * Affiche `projectPhoto` (carte ou photo) dès qu’il est renseigné dans
 * `content/site.ts`, sinon le cadre placeholder.
 */
export function ProjectVisual() {
  if (!projectPhoto) {
    return <Placeholder label={site.project.photoLabel} className="min-h-[300px]" />;
  }

  return (
    <figure className="relative overflow-hidden rounded-sm border border-line bg-surface">
      <Image
        src={projectPhoto.src}
        alt={projectPhoto.alt}
        width={projectPhoto.width}
        height={projectPhoto.height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full object-contain"
        priority={false}
      />
      <figcaption className="border-t border-line px-4 py-3 text-[10px] uppercase tracking-wide text-ink-mute">
        {site.project.location.city} · {site.project.location.region} ·{" "}
        {site.project.location.surface}
      </figcaption>
    </figure>
  );
}
