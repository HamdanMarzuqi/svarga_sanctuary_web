"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { rooms } from "@/data/content";
import { RoomCard } from "@/components/rooms/room-card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";

export function FeaturedRooms() {
  const t = useTranslations("rooms");

  return (
    <section className="relative bg-ink-soft/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              RUANG UNTUK BERISTIRAHAT
            </span>
            <h2 className="font-display text-3xl font-light text-cream sm:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Link href="/rooms">
            <Button variant="outline" size="md" className="group">
              <span>{t("pageTitle")}</span>
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </AnimatedSection>

        {/* 3 Featured Rooms Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {rooms.slice(0, 3).map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
