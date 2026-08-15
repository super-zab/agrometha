import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { ContactForm } from "@/components/ui/ContactForm";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";

export function Contact() {
  const { contact } = site;
  const { details } = contact;

  return (
    <section id="contact" className="relative bg-canvas px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <div>
          <SectionEyebrow index="10" label="Contact" />
          <RevealText
            text={contact.title}
            className="text-display text-4xl text-ink md:text-5xl"
          />
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">{contact.body}</p>

          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-agro" />
              <a
                href={`mailto:${details.email.value}`}
                data-cursor="hover"
                className="text-ink transition-colors hover:text-volt-deep"
              >
                {details.email.value}
              </a>
              <ConfirmBadge confirmed={details.email.confirmed} />
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-agro" />
              <span className="text-ink">{details.phone.value}</span>
              <ConfirmBadge confirmed={details.phone.confirmed} />
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-agro" />
              <span className="text-ink">{details.address.value}</span>
            </li>
          </ul>

          <div className="mt-8">
            {contact.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                data-cursor="hover"
                className="text-[11px] uppercase tracking-wide text-ink-mute transition-colors hover:text-volt-deep"
              >
                {s.label}
                <ConfirmBadge confirmed={s.confirmed} />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
