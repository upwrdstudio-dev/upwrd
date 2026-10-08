import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { scrollToTarget } from '../lib/scroll'

const RADIUS = 21

// Back-to-top button whose ring doubles as the page scroll-progress meter.
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 700))

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToTarget(0)}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className="group fixed bottom-5 right-5 z-[120] grid h-12 w-12 place-items-center rounded-full bg-ink/85 text-paper shadow-lg shadow-black/20 backdrop-blur md:bottom-8 md:right-8"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="#2B5BFF"
              strokeWidth="2"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
