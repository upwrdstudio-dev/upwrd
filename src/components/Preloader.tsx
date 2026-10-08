import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion } from 'framer-motion'
import { LogoMark } from './Logo'
import { markIntroDone, shouldPlayIntro } from '../lib/intro'
import { lockScroll } from '../lib/scroll'
import { EASE_IN_OUT, EASE_OUT, prefersReducedMotion } from '../lib/motion'

const COUNT_DURATION = 1.7

// First-visit intro: the mark assembles while a counter runs to 100, then the
// whole panel lifts away to reveal the hero. Plays once per session.
export default function Preloader() {
  const [visible, setVisible] = useState(shouldPlayIntro)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    if (prefersReducedMotion()) {
      setVisible(false)
      markIntroDone()
      return
    }
    lockScroll(true)
    const controls = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setVisible(false)
          markIntroDone()
          lockScroll(false)
        }, 250)
      },
    })
    return () => {
      controls.stop()
      lockScroll(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[500] flex flex-col justify-between bg-ink p-5 text-paper md:p-8"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE_IN_OUT }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-white/50"
          >
            <span>UPWRD Studio</span>
            <span>Malaysia</span>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <LogoMark intro className="h-20 w-20 text-paper md:h-24 md:w-24" />
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
                className="text-sm tracking-[-0.01em] text-white/60"
              >
                Building things that move{' '}
                <span className="font-serif text-base italic text-accent-soft">upward</span>
              </motion.p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 max-w-xs origin-left bg-white/10">
              <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <span className="font-medium leading-none tracking-tightest text-6xl tabular-nums md:text-8xl">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
