"use client";

import { useState } from "react";
import { site } from "@/content/site";

const { form } = site.contact;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          org: data.get("org"),
          email: data.get("email"),
          role: data.get("role"),
          message: data.get("message"),
        }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  const field =
    "w-full rounded-sm border border-line bg-surface/70 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-mute focus:border-volt focus:shadow-glow-volt";

  return (
    <form
      onSubmit={onSubmit}
      className="glass space-y-4 rounded-sm p-6 md:p-8"
      data-lenis-prevent
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink-mute">
            {form.name}
          </span>
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink-mute">
            {form.org}
          </span>
          <input name="org" className={field} autoComplete="organization" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink-mute">
          {form.email}
        </span>
        <input name="email" type="email" required className={field} autoComplete="email" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink-mute">
          {form.role}
        </span>
        <select name="role" required className={field} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {form.roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink-mute">
          {form.message}
        </span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      <button
        type="submit"
        disabled={status === "sending" || status === "ok"}
        data-cursor="hover"
        className="w-full rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-canvas transition-all hover:bg-volt-deep hover:shadow-glow-volt disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? form.sending : form.submit}
      </button>

      {status === "ok" ? (
        <p className="text-sm text-volt-deep">{form.success}</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-amber-deep">{form.error}</p>
      ) : null}
    </form>
  );
}
