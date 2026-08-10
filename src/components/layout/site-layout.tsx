"use client";
import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTranslations } from "next-intl";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:rounded-full focus:text-ink focus:font-semibold focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  );
}
