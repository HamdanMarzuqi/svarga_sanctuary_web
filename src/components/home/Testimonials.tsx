"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { testimonials } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Star, Quote } from "lucide-react";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import type { Locale } from "@/types/content";

export function Testimonials() {
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden bg-ink-soft/50 py-24">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 size-[500px] -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-0 size-64 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            KATA MEREKA YANG PERNAH MENGINAP
          </span>
          <h2 className="font-display text-3xl font-light text-cream sm:text-5xl">
            Cerita dari Svarga
          </h2>
          <p className="mt-4 text-sm text-muted">
            Kenyamanan sejati dirasakan dari pengalaman langsung para tamu kami.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </AnimatedSection>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item) => {
            const quoteText = item.quote[locale];
            return (
              <motion.div
                key={item.id}
                variants={fadeUpVariant}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gold/20 bg-ink/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:shadow-xl"
              >
                <Quote
                  size={48}
                  className="pointer-events-none absolute top-6 right-6 text-gold/10 transition-colors group-hover:text-gold/20"
                />

                <div>
                  {/* Rating Stars */}
                  <div className="mb-4 flex items-center gap-1 text-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <Star size={16} fill="#C9A84C" strokeWidth={0} />
                      </motion.div>
                    ))}
                  </div>

                  <p className="mb-6 font-light italic leading-relaxed text-cream/90 text-sm md:text-base">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gold/15 pt-4">
                  <div className="flex size-12 items-center justify-center rounded-full border border-gold/50 bg-[#3D2600]/80 font-display text-base font-bold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-cream transition-colors group-hover:text-gold">
                      {item.guestName}
                    </h4>
                    <span className="block text-xs text-muted">
                      {item.origin} {item.stayMonth ? `• ${item.stayMonth}` : ""}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
