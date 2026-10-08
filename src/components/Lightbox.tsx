import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { lockScroll } from '../lib/scroll'
import { EASE_OUT } from '../lib/motion'
import type { DesignItem } from '../data/designItems'

type LightboxProps = {
  items: DesignItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

const SWIPE_THRESHOLD = 60

function NavButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={dir === 'prev' ? 'Previous' : 'Next'}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white md:grid ${
        dir === 'prev' ? 'left-6' : 'right-6'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const current = index !== null ? items[index] : null

  const go = useCallback(
    (step: number) => {
      if (index === null) return
      onNavigate((index + step + items.length) % items.length)
    },
    [index, items.length, onNavigate],
  )

  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [isOpen, onClose, go])

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[350] flex items-center justify-center bg-ink/95 px-4 py-16 backdrop-blur-md md:px-24"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <NavButton dir="prev" onClick={() => go(-1)} />
          <NavButton dir="next" onClick={() => go(1)} />

          <AnimatePresence mode="wait">
            <motion.figure
              key={current.image}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) go(1)
                else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
              }}
              className="flex max-h-full max-w-4xl cursor-grab flex-col items-center active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.image}
                alt={`${current.category} — ${current.title}`}
                className="max-h-[72vh] w-auto rounded-xl object-contain shadow-2xl"
                draggable={false}
              />
              <figcaption className="mt-5 flex items-center gap-4 text-sm">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">{current.category}</span>
                <span className="text-paper">{current.title}</span>
                <span className="font-mono text-[11px] text-white/50">
                  {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
