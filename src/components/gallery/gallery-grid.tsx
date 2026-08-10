"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  ExternalLink,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { galleryItems } from "@/data/content";
import { wa } from "@/lib/wa";
import type { GalleryCategory, Locale } from "@/types/content";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<GalleryCategory>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const items = galleryItems.filter(
    (x) => active === "all" || x.category === active
  );

  useEffect(() => {
    if (selected === null) {
      document.body.style.overflow = "";
      lastTrigger.current?.focus();
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((v) => (v === null ? 0 : (v + 1) % items.length));
      if (e.key === "ArrowLeft")
        setSelected((v) =>
          v === null ? items.length - 1 : (v - 1 + items.length) % items.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, items.length]);

  const filters: { key: GalleryCategory; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "rooms", label: t("filterRooms") },
    { key: "common", label: t("filterCommon") },
    { key: "food", label: t("filterFood") },
    { key: "around", label: t("filterAround") },
  ];

  const handlePrev = () =>
    setSelected((prev) =>
      prev === 0 ? items.length - 1 : (prev ?? 0) - 1
    );
  const handleNext = () =>
    setSelected((prev) =>
      prev === items.length - 1 ? 0 : (prev ?? 0) + 1
    );

  const shareUrl = (item: (typeof galleryItems)[number]) =>
    wa(locale, `Halo Svarga, saya tertarik dengan: ${item.title[locale]}. Apakah tersedia?`);

  return (
    <div>
      {/* Category Tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-xs uppercase tracking-[.14em] font-semibold transition-all duration-300 ${
              active === f.key
                ? "bg-gold text-ink shadow-[0_0_24px_rgba(201,168,76,.35)]"
                : "border border-gold/30 bg-ink-soft text-cream/80 hover:border-gold hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => {
            const big =
              active === "all" ? idx === 0 || idx === 4 : idx === 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  lastTrigger.current =
                    document.activeElement as HTMLButtonElement | null;
                  setSelected(idx);
                }}
                className={cn(
                                    "group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/20 bg-ink-soft shadow-lg transition-[transform,border-color,box-shadow] duration-500 ease-out hover:border-gold/50 hover:shadow-[0_12px_40px_rgba(0,0,0,.5)] will-change-transform",
                                    big
                                      ? "sm:row-span-2 lg:col-span-2 lg:row-span-2"
                                      : ""
                                  )}>
                {/* Static skeleton backdrop: sits BEHIND the image (z-0).
                    Image covers it once loaded. No infinite animation —
                    avoids constant repaint during scroll. */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-ink-soft via-[#2A1A08] to-ink-soft" />
                <Image
                  src={item.url}
                  alt={item.title[locale]}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                {/* Hover: open hint */}
                <div className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-ink/60 text-gold opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 size={15} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && items[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${t("galleryAlt")}: ${items[selected].title[locale]}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t("close")}
              className="absolute right-6 top-6 grid size-12 cursor-pointer place-items-center rounded-full border border-gold/50 bg-ink-soft text-cream transition-colors hover:text-gold"
            >
              <X size={24} />
            </button>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t("previous")}
              className="absolute left-6 top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-gold/50 bg-ink-soft text-cream transition-colors hover:text-gold sm:grid"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t("next")}
              className="absolute right-6 top-1/2 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-gold/50 bg-ink-soft text-cream transition-colors hover:text-gold sm:grid"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={items[selected].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex max-h-[88vh] w-full max-w-4xl flex-col"
            >
              <div className="relative h-[52vh] w-full overflow-hidden rounded-2xl border border-gold/40 sm:h-[62vh]">
                <Image
                  src={items[selected].url}
                  alt={items[selected].title[locale]}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="min-w-0">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <Camera size={14} className="shrink-0 text-gold" />
                    <span className="text-[11px] uppercase tracking-[.18em] text-muted">
                      {selected + 1} / {items.length} ·{" "}
                      {t(
                        `filter${items[selected].category.charAt(0).toUpperCase()}${items[selected].category.slice(1)}`
                      )}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-cream">
                    {items[selected].title[locale]}
                  </h3>
                  {items[selected].caption && (
                    <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-cream/75">
                      {items[selected].caption[locale]}
                    </p>
                  )}
                </div>
                <a
                  href={shareUrl(items[selected])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/50 bg-ink-soft px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
                >
                  <Share2 size={14} />
                  {t("askWhatsapp")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking CTA */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 overflow-hidden rounded-3xl border border-gold/25 bg-ink-soft"
      >
        <div className="line-art relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-gold">
              {t("ctaEyebrow")}
            </span>
            <h3 className="mt-2 font-display text-3xl font-light text-cream sm:text-4xl">
              {t("ctaTitle")}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {t("ctaSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={wa(locale)} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-[0_0_28px_rgba(201,168,76,.4)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110">
                {t("ctaWhatsapp")}
              </span>
            </a>
            <a href={`/${locale}/booking`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10">
                {t("ctaBook")}
                <ExternalLink size={14} />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
