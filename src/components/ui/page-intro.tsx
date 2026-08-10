"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";

export function PageIntro({
  children,
  title,
  text,
}: {
  children: React.ReactNode;
  title: string;
  text: string;
}) {
  const reduce = useReducedMotion();
  const anim = reduce ? false : true;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-soft pt-36 pb-20">
        <div className="line-art absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="container relative">
          <motion.p
            initial={anim ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm uppercase tracking-[.18em] text-gold"
          >
            Svarga Sanctuary
          </motion.p>
          <motion.h1
            initial={anim ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-3xl font-display text-6xl font-light leading-none md:text-8xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={anim ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-8 text-muted"
          >
            {text}
          </motion.p>
        </div>
      </section>
      <section className="section-pad bg-ink">
        <div className="container">{children}</div>
      </section>
    </>
  );
}
