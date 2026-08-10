"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { wa } from "@/lib/wa";
import { motion } from "motion/react";
import type { Locale } from "@/types/content";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale() as Locale;

  const links = [
    { label: tn("rooms"), href: "/rooms" },
    { label: tn("gallery"), href: "/gallery" },
    { label: tn("blog"), href: "/blog" },
    { label: tn("about"), href: "/about" },
  ];

  return (
    <footer className="border-t border-cream/10 bg-ink">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-display text-3xl">
            Svarga <span className="text-gold">Sanctuary</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{t("tagline")}</p>
        </motion.div>

        {/* Explore */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-[.18em] text-gold">
            {t("explore")}
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-cream/70">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit transition-colors duration-300 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-[.18em] text-gold">
            {t("contact")}
          </h2>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-cream/70">
            <span>Yogyakarta, Indonesia</span>
            <a
              href={wa(locale)}
              target="_blank"
              rel="noreferrer"
              className="w-fit transition-colors duration-300 hover:text-gold"
            >
              WhatsApp
            </a>
            <span>hello@svargasanctuary.example</span>
            <div className="flex gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-gold hover:text-gold"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                href="#"
                aria-label="TikTok"
                className="flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-gold hover:text-gold"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.78a8.21 8.21 0 0 0 4.76 1.52V6.85a4.84 4.84 0 0 1-1-.16z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-gold hover:text-gold"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="container flex flex-col gap-3 border-t border-cream/10 py-6 text-xs text-muted md:flex-row md:justify-between">
        <span>© 2026 Svarga Sanctuary Homestay</span>
        <span>{t("demo")}</span>
      </div>
    </footer>
  );
}
