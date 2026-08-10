"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { WhatsappLogo } from "@/components/ui/icons";
import { CounterSelect } from "@/components/ui/CounterSelect";
import { rooms } from "@/data/content";
import { motion, AnimatePresence } from "motion/react";
import type { Locale } from "@/types/content";

export function BookingForm() {
  const t = useTranslations("booking");
  const locale = useLocale() as Locale;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("standard");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = t("errName");
    if (!/^[\d+\-\s()]{8,15}$/.test(phone.trim())) e.phone = t("errPhone");
    if (!checkIn || new Date(checkIn) < new Date(new Date().toDateString())) e.checkIn = t("errPast");
    if (!checkOut || (checkIn && new Date(checkOut) <= new Date(checkIn))) e.checkOut = t("errCheckOut");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // bot
    if (!validate()) return;
    const selected = rooms.find(x => x.type === room) || rooms[0];
    const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
    const estimated = selected.price.weekday * nights;
    const roomName = selected.name[locale];
    const msg =
      locale === "en"
        ? `Hello Svarga Sanctuary, I would like to book:\n\nName: ${name}\nPhone: ${phone}\nRoom: ${roomName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${adults} adult(s)${Number(children) > 0 ? `, ${children} child(ren)` : ""}\nEstimated: ${nights} night(s) — Rp ${estimated.toLocaleString("id-ID")}${message ? `\nNotes: ${message}` : ""}\n\nPlease confirm availability. Thank you!`
        : `Halo Svarga Sanctuary, saya ingin memesan:\n\nNama: ${name}\nTelepon: ${phone}\nKamar: ${roomName}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nTamu: ${adults} dewasa${Number(children) > 0 ? `, ${children} anak` : ""}\nEstimasi: ${nights} malam — Rp ${estimated.toLocaleString("id-ID")}${message ? `\nCatatan: ${message}` : ""}\n\nMohon konfirmasi ketersediaan. Terima kasih!`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628xxxxxxxxxx"}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const inputClass = (field: string) =>
    `min-h-12 rounded-lg border px-4 text-cream outline-none bg-ink-soft transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] focus:-translate-y-px ${errors[field] ? "border-red-400" : "border-cream/20"}`;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto grid size-20 place-items-center rounded-full bg-gold/15"
        >
          <Check size={48} className="text-gold" />
        </motion.div>
        <h2 className="mt-6 font-display text-4xl font-light text-cream">{t("success")}</h2>
        <p className="mt-4 text-muted">{t("successText")}</p>
      </motion.div>
    );
  }

  return (
    <div className="container grid gap-12 lg:grid-cols-[1fr_.65fr]">
      <motion.form
        onSubmit={submit}
        className="grid gap-5"
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Honeypot — hidden from humans, traps bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} value={honeypot} onChange={e => setHoneypot(e.target.value)} />

        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-400"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>

        <label className="grid gap-2 text-sm">
          {t("fullName")} *
          <input required value={name} onChange={e => setName(e.target.value)} className={inputClass("name")} />
        </label>

        <label className="grid gap-2 text-sm">
          {t("phone")} *
          <input required value={phone} onChange={e => setPhone(e.target.value)} className={inputClass("phone")} placeholder="08xxxxxxxxxx" />
          {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
        </label>

        <label className="grid gap-2 text-sm">
          {t("roomType")} *
          <select value={room} onChange={e => setRoom(e.target.value)} className={inputClass("room")}>
            {rooms.map(r => (
              <option key={r.slug} value={r.type}>
                {r.name[locale]} — Rp {r.price.weekday.toLocaleString("id-ID")}/{t("night")}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            {t("checkIn")} *
            <input type="date" required value={checkIn} onChange={e => setCheckIn(e.target.value)} className={inputClass("checkIn")} />
            {errors.checkIn && <span className="text-xs text-red-400">{errors.checkIn}</span>}
          </label>
          <label className="grid gap-2 text-sm">
            {t("checkOut")} *
            <input type="date" required value={checkOut} onChange={e => setCheckOut(e.target.value)} className={inputClass("checkOut")} />
            {errors.checkOut && <span className="text-xs text-red-400">{errors.checkOut}</span>}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <CounterSelect label={t("adults")} value={Number(adults)} onChange={(v) => setAdults(String(v))} min={1} max={6} />
          <CounterSelect label={t("children")} value={Number(children)} onChange={(v) => setChildren(String(v))} max={4} />
        </div>

        <label className="grid gap-2 text-sm">
          {t("notes")}
          <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} className={`${inputClass("message")} resize-none`} />
        </label>

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 flex items-center justify-center gap-3 rounded-full bg-gold py-4 font-semibold text-ink shadow-[0_0_24px_rgba(201,168,76,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_32px_rgba(201,168,76,0.5)]"
        >
          <WhatsappLogo size={20} />
          {t("submit")}
          <ArrowRight size={16} />
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[var(--radius-card)] bg-ink-soft p-8"
      >
        <h3 className="font-display text-3xl font-light">{t("helpTitle")}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{t("helpText")}</p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628xxxxxxxxxx"}?text=${encodeURIComponent(locale === "en" ? "Hello, I need help with booking." : "Halo, saya butuh bantuan pemesanan.")}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center gap-3 rounded-full border border-cream/20 py-3 px-5 text-sm text-cream transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5"
        >
          <WhatsappLogo size={18} className="text-gold" />
          {t("chat")}
        </a>
      </motion.div>
    </div>
  );
}
