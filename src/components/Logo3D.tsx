import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Logo3D() {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 })
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 })

  const glowX = useTransform(springRY, [-14, 14], [30, 70])
  const glowY = useTransform(springRX, [-14, 14], [70, 30])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 28)
    rotateX.set((0.5 - py) * 28)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const extrusionLayers = Array.from({ length: 14 })
    .map((_, i) => `${i * 0.6}px ${i * 0.6}px 0 rgba(0,194,168,${0.35 - i * 0.02})`)
    .join(', ')

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block py-8"
      style={{ perspective: 800 }}
    >
      <motion.div
        className="absolute -inset-16 rounded-full blur-3xl pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]: number[]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(0,194,168,0.35), transparent 70%)`
          ),
        }}
      />
      <motion.div
        style={{
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <span
          className="font-display text-6xl md:text-8xl text-cream select-none block"
          style={{ textShadow: extrusionLayers }}
        >
          UPWRD
        </span>
      </motion.div>
    </div>
  )
}