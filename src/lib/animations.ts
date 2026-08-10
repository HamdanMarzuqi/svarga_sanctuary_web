import type { Variants } from "motion/react";
const ease = [0.16, 1, 0.3, 1] as const;
export const fadeUpVariant: Variants = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:.7,ease}} };
export const staggerContainer = { hidden:{}, visible:{transition:{staggerChildren:.12,delayChildren:.1}} };
export const scaleInVariant: Variants = { hidden:{opacity:0,scale:.92}, visible:{opacity:1,scale:1,transition:{duration:.5,ease}} };
export const slideLeftVariant: Variants = { hidden:{opacity:0,x:-60}, visible:{opacity:1,x:0,transition:{duration:.6,ease}} };
