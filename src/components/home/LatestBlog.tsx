"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { posts } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import type { Locale } from "@/types/content";

export function LatestBlog() {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;

  return (
    <section className="relative bg-ink-soft/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              SVARGA JOURNAL
            </span>
            <h2 className="font-display text-3xl font-light text-cream sm:text-5xl">
              {t("pageTitle")}
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="outline" size="md" className="group">
              <span>{t("loadMore")}</span>
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </AnimatedSection>

        {/* 3 Blog Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {posts.slice(0, 3).map((post) => {
            const title = post.title[locale];
            const excerpt = post.excerpt[locale];

            return (
              <motion.div
                key={post.slug}
                variants={fadeUpVariant}
                whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-ink-soft shadow-lg transition-all duration-500 hover:border-gold/50 hover:shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden bg-ink">
                  <Image
                    src={post.image}
                    alt={post.imageAlt[locale]}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 rounded-full border border-gold/40 bg-ink/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-gold" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-gold" />
                        {post.readingTime} {t("minRead")}
                      </span>
                    </div>

                    <h3 className="mb-3 line-clamp-2 font-display text-xl font-semibold text-cream transition-colors duration-300 group-hover:text-gold">
                      {title}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-xs leading-relaxed text-muted">
                      {excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center justify-between border-t border-gold/15 pt-3 text-xs font-semibold text-gold transition-all duration-300 hover:text-gold-light"
                  >
                    <span>{t("readMore")}</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
