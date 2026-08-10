"use client";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full uppercase tracking-wider text-xs md:text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-gold text-ink shadow-[0_0_24px_rgba(201,168,76,.35)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_32px_rgba(201,168,76,0.5)] active:translate-y-0 active:scale-95 font-semibold",
    secondary:
      "bg-ink-soft text-cream border border-gold/40 hover:border-gold hover:bg-[#3D2600] hover:-translate-y-0.5 active:scale-95",
    outline:
      "bg-transparent border border-gold text-gold hover:bg-gold/10 hover:-translate-y-0.5 active:scale-95",
    whatsapp:
      "bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] hover:shadow-green-500/25 hover:-translate-y-0.5 active:scale-95 font-semibold",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs md:text-sm",
    lg: "px-8 py-4 text-sm md:text-base",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
