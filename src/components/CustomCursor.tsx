import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  useEffect(() => {

    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const isInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.closest('a, button, [role="button"]')

    const over = (e: MouseEvent) => setHovering(!!isInteractive(e.target))

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }

  }, [])

  if (!enabled) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[200] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full bg-cream"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="absolute rounded-full border border-cream"
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  )
}