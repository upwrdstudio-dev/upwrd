import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

type MagneticProps = {
  children: ReactNode
  className?: string
  href: string
  target?: string
  rel?: string
}

const MAX_OFFSET = 8

export default function Magnetic({ children, className, href, target, rel }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 25, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 300, damping: 25, mass: 0.3 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * 0.15)))
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * 0.15)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}