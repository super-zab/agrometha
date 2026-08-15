import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-alt px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-ink-soft">{site.footer.legal}</p>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-ink-mute">{site.footer.note}</p>
      </div>
    </footer>
  );
}
