"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { posts } from "@/data/content";
import type { Locale } from "@/types/content";

export function BlogList({ lang }: { lang: Locale }) {
  const t = useTranslations("blog");
  const [visible, setVisible] = useState(6);
  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt[lang]}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[.16em] text-gold">
                {post.category}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-snug transition-colors duration-300 group-hover:text-gold md:text-3xl">
                {post.title[lang]}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted line-clamp-2">
                {post.excerpt[lang]}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {new Date(post.date).toLocaleDateString(
                      lang === "id" ? "id-ID" : "en-US",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    {post.readingTime} {t("minRead")}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                  {t("readMore")}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 6)}
            aria-label={t("loadMore")}
            className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-gold/40 px-8 font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {t("loadMore")}
            <ArrowDown size={17} />
          </button>
        </div>
      )}
    </>
  );
}
