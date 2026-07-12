import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type LightboxItem = {
  title: string
  category: string
  image: string
}

type LightboxProps = {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null
  const current = index !== null ? items[index] : null

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-navy-dark/95 backdrop-blur-sm flex items-center justify-center px-4 md:px-16 py-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 text-cream/70 hover:text-cream transition-colors z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-teal transition-colors z-10"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-cream/50 hover:text-teal transition-colors z-10"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <motion.div
            key={current.image}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="max-w-3xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={`${current.category} — ${current.title}`}
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
            />
            <div className="mt-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-teal">{current.category}</p>
              <p className="font-display text-lg text-cream">{current.title}</p>
              <p className="font-mono text-[10px] text-cream/40 mt-1">
                {index !== null ? index + 1 : 0} / {items.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}