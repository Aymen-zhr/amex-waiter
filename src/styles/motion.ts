import type { Transition, Variants } from 'framer-motion';

/**
 * Tap spring animation constants tuned for tablet ergonomics
 * 6. Framer Motion Presets (src/styles/motion.ts)
 */
export const tapSpring = {
  whileTap: { scale: 0.985 },
  transition: { duration: 0.1 },
} as const;

/**
 * Modal appearance and dismissal motion curve
 */
export const modalMotion = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
  transition: { type: 'spring', damping: 26, stiffness: 320 } as Transition,
} as const;

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
};

export const modalTransition: Transition = {
  type: 'spring',
  damping: 26,
  stiffness: 320,
};

/**
 * Tab pill transition for layoutId="activePill"
 */
export const tabLayoutTransition: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 350,
};