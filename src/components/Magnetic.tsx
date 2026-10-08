import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { hasFinePointer } from '../lib/motion'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

// Pulls its child toward the pointer while hovered, then springs back.
export default function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    if (!hasFinePointer() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}
