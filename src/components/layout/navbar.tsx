"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { wa } from "@/lib/wa";
import type { Locale } from "@/types/content";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [locale]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links: { label: string; href: string }[] = [
    { label: t("home"), href: "/" },
    { label: t("rooms"), href: "/rooms" },
    { label: t("gallery"), href: "/gallery" },
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  function switchLocale() {
    const next = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-ink/90 backdrop-blur-xl shadow-lg"
          : "bg-gradient-to-b from-ink/80 via-ink/40 to-transparent"
      }`}
    >
      <div className="container flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-cream transition-colors hover:text-gold"
        >
          Svarga <span className="text-gold">Sanctuary</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-sm tracking-wide text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                  pathname === l.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={switchLocale}
            aria-label={t("switchLanguage")}
            className="rounded-full border border-cream/30 px-4 py-2 text-xs font-semibold tracking-widest text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {locale.toUpperCase()}
          </motion.button>
          <a
            href={wa(locale)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_28px_rgba(201,168,76,0.5)]"
          >
            {t("bookNow")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="grid size-11 place-items-center text-cream lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu — Animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-cream/10 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
              className="container flex flex-col gap-1 py-6"
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                      pathname === l.href
                        ? "bg-gold/10 text-gold"
                        : "text-cream hover:bg-gold/5 hover:text-gold"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="px-4 pt-3"
              >
                <a
                  href={wa(locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  {t("bookNow")}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
