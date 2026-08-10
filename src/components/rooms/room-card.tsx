"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { Locale, Room } from "@/types/content";

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const t = useTranslations("rooms");
  const locale = useLocale() as Locale;

  const staggerDelay = index * 0.1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
      className={`group overflow-hidden rounded-[var(--radius-card)] bg-ink-soft shadow-lg transition-all duration-500 hover:shadow-xl ${
        index === 1 ? "lg:translate-y-8" : ""
      }`}
    >
      <Link href={`/rooms/${room.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={room.image}
            alt={room.imageAlt[locale]}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-3xl text-cream transition-colors duration-300 group-hover:text-gold">
              {room.name[locale]}
            </h3>
            <span className="whitespace-nowrap font-display text-2xl text-gold">
              Rp {room.price.weekday.toLocaleString("id-ID")}
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-muted">
            {room.shortDescription[locale]}
          </p>

          {/* Amenities */}
          <div className="mt-5 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded-full border border-cream/15 bg-ink/50 px-3 py-1 text-xs text-cream/70 transition-colors group-hover:border-gold/30"
              >
                {a}
              </span>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex items-center justify-between border-t border-cream/10 pt-5 text-sm">
            <span className="text-muted">{t("perNight")}</span>
            <span className="inline-flex items-center gap-2 font-semibold text-gold transition-all duration-300 group-hover:gap-3">
              {t("viewDetail")}
              <motion.div
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
