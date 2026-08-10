"use client";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { fadeUpVariant } from "@/lib/animations";

export function Reveal({
  children,
  className = "",
  variant = fadeUpVariant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={variant}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}
