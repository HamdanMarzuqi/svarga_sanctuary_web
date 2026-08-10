import type { Locale } from "@/types/content";

export function wa(locale: Locale, customMsg?: string) {
  const n = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628xxxxxxxxxx";
  const msg =
    customMsg ??
    (locale === "id"
      ? "Halo Svarga Sanctuary, saya ingin menanyakan ketersediaan kamar."
      : "Hello Svarga Sanctuary, I would like to ask about room availability.");
  return `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
}
