"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { wa } from "@/lib/wa";
import { useLocale } from "next-intl";
import type { Locale } from "@/types/content";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  const handleWhatsAppBooking = () => {
    window.open(wa(locale), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_homestay.jpg"
          alt="Svarga Sanctuary Homestay Cabins"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
        {/* Fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Content — bottom positioned per design spec */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-ink/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur-md"
        >
          <Sparkles size={14} />
          <span>{t("eyebrow")}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-4xl font-light leading-[1.1] tracking-tight text-cream drop-shadow-lg [text-wrap:balance] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t("headline")}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-cream/80 drop-shadow sm:text-lg md:text-xl"
        >
          {t("subline")}
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row"
        >
          <Link href="/rooms" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="group w-full sm:w-auto">
              <span>{t("explore")}</span>
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={handleWhatsAppBooking}
            className="w-full border-cream/40 px-8 text-cream hover:border-gold hover:bg-gold/15 sm:w-auto"
          >
            {t("whatsapp")}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gold"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
