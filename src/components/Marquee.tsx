import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { prefersReducedMotion } from '../lib/motion'

type MarqueeProps = {
  children: ReactNode
  /** Pixels per second at rest. */
  speed?: number
  reverse?: boolean
  className?: string
  /** Slow to a crawl while hovered, so items can be inspected. */
  slowOnHover?: boolean
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Infinite marquee whose speed (and direction) follows scroll velocity, so
// it surges when the page is flicked and drifts when it's still.
export default function Marquee({ children, speed = 60, reverse = false, className = '', slowOnHover = false }: MarqueeProps) {
  const x = useMotionValue(0)
  const copyRef = useRef<HTMLDivElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)
  const hovering = useRef(false)
  const direction = useRef(reverse ? -1 : 1)
  const reduced = useRef(false)

  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false })

  useEffect(() => {
    reduced.current = prefersReducedMotion()
    const el = copyRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setCopyWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (!copyWidth || reduced.current) return
    const b = boost.get()
    if (b < -0.05) direction.current = reverse ? 1 : -1
    else if (b > 0.05) direction.current = reverse ? -1 : 1
    let move = direction.current * speed * (delta / 1000) * (1 + Math.abs(b))
    if (hovering.current) move *= 0.15
    x.set(wrap(-copyWidth, 0, x.get() - move))
  })

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      onPointerEnter={() => slowOnHover && (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.div className="flex w-max shrink-0" style={{ x }}>
        <div ref={copyRef} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
