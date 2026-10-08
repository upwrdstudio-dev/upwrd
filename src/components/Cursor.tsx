import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { hasFinePointer } from '../lib/motion'

// A label bubble that trails the pointer over anything marked
// `data-cursor="Label"`. The native cursor is left alone everywhere else.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (!hasFinePointer()) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      setLabel(el?.dataset.cursor ?? null)
    }
    const leave = () => setLabel(null)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[400]"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {label && (
          <motion.div
            key="bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="-ml-11 -mt-11 grid h-[88px] w-[88px] place-items-center rounded-full bg-accent text-[13px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(43,91,255,0.8)]"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
