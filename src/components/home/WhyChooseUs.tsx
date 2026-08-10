"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MapPin, Castle, Trees, HeartHandshake } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";

export function WhyChooseUs() {
  const t = useTranslations("why");

  const items = [
    {
      icon: MapPin,
      title: t("rooms"),
      desc: t("roomsText"),
    },
    {
      icon: HeartHandshake,
      title: t("welcome"),
      desc: t("welcomeText"),
    },
    {
      icon: Trees,
      title: t("pendopo"),
      desc: t("pendopoText"),
    },
    {
      icon: Castle,
      title: t("location"),
      desc: t("locationText"),
    },
  ];

  return (
    <section className="relative bg-ink py-24">
      {/* Subtle decorative pattern */}
      <div className="pointer-events-none absolute inset-0 line-art opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            MENGINAP LEBIH TENANG
          </span>
          <h2 className="font-display text-3xl font-light text-cream sm:text-5xl">
            {t("title")}
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </AnimatedSection>

        {/* 4 Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className="group rounded-2xl border border-gold/15 bg-ink-soft/60 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:bg-ink-soft/80 hover:shadow-xl"
              >
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-[#3D2600]/80 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-cream transition-colors duration-300 group-hover:text-gold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
