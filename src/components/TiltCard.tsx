import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}

export default function TiltCard({ children, className, maxTilt = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springRX = useSpring(rx, { stiffness: 250, damping: 20 })
  const springRY = useSpring(ry, { stiffness: 250, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * maxTilt * 2)
    rx.set((0.5 - py) * maxTilt * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 60%)`
  )

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${className} overflow-hidden`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX: springRX, rotateY: springRY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        {children}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  )
}