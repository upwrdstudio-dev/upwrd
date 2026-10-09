import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'

// Concept businesses are fictional, so actions like "Order on WhatsApp" must
// not message anyone real. They show a short note explaining what the button
// would do on a live client site instead.
export function useDemoAction(className = 'bg-[#0A0A0A] text-white') {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const demo = useCallback((text: string) => {
    return (e?: { preventDefault: () => void }) => {
      e?.preventDefault()
      setMessage(text)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setMessage(null), 3600)
    }
  }, [])

  const toast = (
    <div className="pointer-events-none fixed inset-x-0 bottom-16 z-[450] flex justify-center px-4" role="status">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className={`w-full max-w-[420px] rounded-2xl px-5 py-4 text-sm shadow-2xl ${className}`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return { demo, toast }
}
