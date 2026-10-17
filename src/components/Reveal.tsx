import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.2), ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
