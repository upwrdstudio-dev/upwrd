import { motion } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'
import { LOCKUP_WIDTH, WORDMARK_PATH } from './logoPaths'

// The mark: a heavy "U" whose right arm is missing a block — that block has
// lifted clear of the letter and sits above it, one step up. The gap it left
// is exactly its own height, so the rise reads as deliberate. Drawn on a
// 48-unit grid so it stays crisp down to favicon size.
export const MARK_U = 'M7 14h10v15a7 7 0 0 0 14 0V24h10v5a17 17 0 0 1-34 0Z'
export const MARK_BLOCK = { x: 31, y: 4, size: 10 }

type LogoMarkProps = {
  className?: string
  blockClassName?: string
  intro?: boolean
  delay?: number
}

export function LogoMark({
  className,
  blockClassName = 'text-accent',
  intro = false,
  delay = 0,
}: LogoMarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <motion.g
        style={{ transformOrigin: '24px 46px', transformBox: 'view-box' }}
        initial={intro ? { scaleY: 0 } : false}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      >
        <path d={MARK_U} fill="currentColor" />
      </motion.g>
      <motion.g
        initial={intro ? { y: 20, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: delay + 0.55 }}
      >
        <rect
          x={MARK_BLOCK.x}
          y={MARK_BLOCK.y}
          width={MARK_BLOCK.size}
          height={MARK_BLOCK.size}
          fill="currentColor"
          className={`mark-block ${blockClassName}`}
        />
      </motion.g>
    </svg>
  )
}

// The full lockup, drawn from the same outlines as the files in public/brand,
// so the mark's U matches the cap height and sits on the wordmark's baseline.
// Cropped to the artwork (x 7 → LOCKUP_WIDTH - 7, y 4 → 46) so it aligns
// flush with neighbouring content.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`7 4 ${LOCKUP_WIDTH - 14} 42`}
      className={`group/logo block h-auto overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path d={MARK_U} fill="currentColor" />
      <rect
        x={MARK_BLOCK.x}
        y={MARK_BLOCK.y}
        width={MARK_BLOCK.size}
        height={MARK_BLOCK.size}
        className="fill-accent transition-transform duration-500 ease-out-expo group-hover/logo:-translate-y-[3px]"
      />
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  )
}
