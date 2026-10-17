import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// On route changes after the first, a quick fade (in the colour the next page
// opens with) hides the scroll reset, without making anyone wait.
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
      className={`pointer-events-none fixed inset-0 z-[450] ${pathname === '/' ? 'bg-ink' : 'bg-paper'}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
    />
  )
}
