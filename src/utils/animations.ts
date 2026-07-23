// ============================================================
// Nova Webs — Animation & Scroll Utility Functions
// ============================================================

/**
 * Default scroll observer options for section reveals.
 * Triggers when 10% of the element is visible, 50px before entering viewport.
 */
export const scrollObserverOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

/**
 * Stagger delay calculator — returns delay in seconds based on index and base delay.
 */
export const staggerDelay = (index: number, baseDelay = 0.1): number =>
  index * baseDelay;

/**
 * Easing presets matching the approved design system.
 */
export const EASINGS = {
  /** The "Nova ease" — fast start, dramatic deceleration */
  out: [0.16, 1, 0.3, 1] as const,
  /** Smooth on both ends */
  inOut: [0.4, 0, 0.2, 1] as const,
  /** Spring with slight overshoot for micro-interactions */
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

/**
 * Animation durations in seconds (matching the design spec).
 */
export const DURATIONS = {
  fast: 0.2,
  micro: 0.25,
  standard: 0.3,
  reveal: 0.5,
  entrance: 0.6,
  slow: 0.8,
  counter: 1.5,
} as const;

/**
 * Framer Motion variants for common animations.
 */
export const fadeUpVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.out,
      delay,
    },
  },
});

export const fadeInVariant = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.standard, delay },
  },
});

export const scaleInVariant = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.entrance,
      ease: EASINGS.out,
      delay,
    },
  },
});

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Generates a staggered animation for child elements.
 */
export const createStaggerVariants = (
  childAnimation: "fadeUp" | "fadeIn" | "scaleIn" = "fadeUp"
) => {
  const childMap = {
    fadeUp: fadeUpVariant,
    fadeIn: fadeInVariant,
    scaleIn: scaleInVariant,
  };
  return {
    container: staggerContainerVariant,
    item: childMap[childAnimation](),
  };
};
