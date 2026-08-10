"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";

export function LocationTeaser() {
  const t = useTranslations("location");

  const landmarks = [
    "Jalan Malioboro — 15 Menit",
    "Candi Prambanan — 20 Menit",
    "Candi Borobudur — 45 Menit",
    "Stasiun Tugu Yogyakarta — 15 Menit",
  ];

  return (
    <section className="relative bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text & Landmarks list */}
          <AnimatedSection>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              LOKASI STRATEGIS
            </span>
            <h2 className="mb-4 font-display text-3xl font-light text-cream sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              {t("text")}
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {landmarks.map((lm, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="group flex items-center gap-4 rounded-xl border border-gold/25 bg-ink-soft/80 p-4 text-cream transition-all duration-300 hover:border-gold/60 hover:bg-ink-soft"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#3D2600] text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink group-hover:scale-110">
                    <Navigation size={18} />
                  </div>
                  <span className="text-sm font-medium">{lm}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex items-center gap-3 text-xs text-muted">
              <MapPin size={16} className="text-gold" />
              <span>Yogyakarta, Indonesia</span>
            </div>
          </AnimatedSection>

          {/* Embedded Google Map — cleaner dark style */}
          <AnimatedSection
            delay={0.2}
            className="relative h-[450px] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-2xl"
          >
            <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl ring-1 ring-inset ring-cream/10" />
            <iframe
              title="Svarga Sanctuary Homestay Yogyakarta Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535492815672!2d110.3752!3d-7.7125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInNDUnJ1MgMTEwwrAyMiczMC43IkU!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) brightness(0.9) contrast(0.95)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
