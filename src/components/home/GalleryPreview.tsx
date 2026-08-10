"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { galleryItems } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Maximize2 } from "lucide-react";
import type { Locale } from "@/types/content";

export function GalleryPreview() {
  const t = useTranslations("gallery");
  const locale = useLocale() as Locale;

  const previewItems = galleryItems.slice(0, 6);

  // Bento spans: 1st & 4th large (2x2 on lg, 2 rows on sm), 6th wide (2 cols)
  const bentoClasses = [
    "sm:row-span-2 lg:col-span-2 lg:row-span-2",
    "",
    "",
    "sm:row-span-2 lg:col-span-2 lg:row-span-2",
    "",
    "lg:col-span-2",
  ];

  return (
    <section className="relative bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            SUASANA SVARGA
          </span>
          <h2 className="font-display text-3xl font-light text-cream sm:text-5xl">
            {t("pageTitle")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t("pageSubtitle")}
          </p>
        </AnimatedSection>

        {/* Bento Grid Preview */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={false}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={bentoClasses[idx]}
            >
              <Link href="/gallery" className="block h-full">
                <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-gold/15 shadow-lg transition-[transform,border-color,box-shadow] duration-500 ease-out hover:border-gold/40 hover:shadow-xl will-change-transform">
                  {/* Static skeleton backdrop: sits BEHIND the image (z-0).
                      Image covers it once loaded. No infinite animation —
                      avoids constant repaint during scroll. */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-ink-soft via-[#2A1A08] to-ink-soft" />
                  <Image
                    src={item.url}
                    alt={item.title[locale]}
                    fill
                    className="z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Always-visible caption bar (z-20: above image z-10) */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent p-5 pt-14">
                    <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-gold">
                      {t(`filter${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}`)}
                    </span>
                    <h4 className="mt-1 font-display text-lg font-bold leading-snug text-cream">
                      {item.title[locale]}
                    </h4>
                    {item.caption && (
                      <p className="mt-1.5 max-w-[42ch] text-xs leading-relaxed text-cream/70 line-clamp-2">
                        {item.caption[locale]}
                      </p>
                    )}
                  </div>
                  <div className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-ink/60 text-gold opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/gallery">
            <Button variant="secondary" size="md" className="group">
              <span>{t("viewAll")}</span>
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
