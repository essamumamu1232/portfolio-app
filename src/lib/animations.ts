import { Variants } from 'framer-motion'

// Easing curves
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const
export const springGentle = { type: 'spring' as const, stiffness: 100, damping: 15 }
export const springBouncy = { type: 'spring' as const, stiffness: 300, damping: 20 }

// Fade + slide up (primary entrance)
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo as any }
  }
}

// Staggered children container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Staggered children item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo as any }
  }
}

// Scale in (for buttons, badges)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBouncy
  }
}

// Mask reveal (for text blocks)
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.8, ease: easeInOutQuart as any }
  }
}

// Word split animation (for hero headline)
export const wordSplitContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3
    }
  }
}

export const wordSplitItem: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: easeOutExpo as any }
  }
}

// Floating ambient node
export const floatNode = (delay: number, duration: number) => ({
  animate: {
    y: [0, -20, 0],
    x: [0, 10, -10, 0],
    opacity: [0.3, 0.6, 0.3]
  },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
})
