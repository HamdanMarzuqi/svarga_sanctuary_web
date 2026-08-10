"use client";

import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CounterSelectProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

/**
 * Animated stepper for guest counts (adults / children).
 * Replaces native <select> whose OS-rendered popup can't be animated.
 */
export function CounterSelect({
  label,
  value,
  onChange,
  min = 0,
  max = 9,
}: CounterSelectProps) {
  const [bump, setBump] = useState(0);

  const step = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    onChange(next);
    setBump((b) => b + 1);
  };

  return (
    <div className="grid gap-2 text-sm">
      <span className="text-cream/80">{label}</span>
      <div className="flex h-12 items-center justify-between rounded-lg border border-cream/20 bg-ink-soft px-2 transition-all duration-300 focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="grid size-9 cursor-pointer place-items-center rounded-full text-cream transition-all duration-200 hover:bg-gold/15 hover:text-gold active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Minus size={16} />
        </button>
        <div className="relative min-w-12 text-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${value}-${bump}`}
              initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-lg font-semibold tabular-nums text-cream"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="grid size-9 cursor-pointer place-items-center rounded-full text-cream transition-all duration-200 hover:bg-gold/15 hover:text-gold active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
