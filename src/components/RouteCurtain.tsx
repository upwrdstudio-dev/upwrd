import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { LogoMark } from './Logo'
import { EASE_IN_OUT } from '../lib/motion'

// On every route change after the first, a panel covers the screen before
// paint and then lifts away, hiding the lazy chunk load and the scroll reset.
export default function RouteCurtain() {
  const { pathname } = useLocation()
  const first = useRef(true)
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setCount((c) => c + 1)
  }, [pathname])

  if (count === 0) return null

  return (
    <motion.div
      key={count}
      className="pointer-events-none fixed inset-0 z-[450] grid place-items-center bg-ink"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.85, delay: 0.35, ease: EASE_IN_OUT }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE_IN_OUT }}
      >
        <LogoMark className="h-12 w-12 text-paper" />
      </motion.div>
    </motion.div>
  )
}
