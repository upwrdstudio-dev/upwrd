import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type ClipRevealProps = {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

const offsetFor = (direction: 'up' | 'left' | 'right') => {
  if (direction === 'left') return { x: '60px', y: 0 }
  if (direction === 'right') return { x: '-60px', y: 0 }
  return { x: 0, y: '40px' }
}

export default function ClipReveal({ children, delay = 0, direction = 'up', className }: ClipRevealProps) {
  const offset = offsetFor(direction)
  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}