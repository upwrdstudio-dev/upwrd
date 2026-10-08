import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div }

type TextRevealProps = {
  lines: ReactNode[]
  as?: keyof typeof tags
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  /** When set, the reveal is driven by this flag instead of entering the viewport. */
  play?: boolean
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
})

const line: Variants = {
  hidden: { y: '115%', rotate: 2 },
  visible: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE_OUT } },
}

// Each line slides up from behind its own mask, so headings assemble line by
// line instead of fading in as one block.
export default function TextReveal({
  lines,
  as = 'h2',
  className,
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  play,
}: TextRevealProps) {
  const MotionTag = tags[as]
  const trigger =
    play === undefined
      ? { whileInView: 'visible', viewport: { once: true, amount: 0.4 } }
      : { animate: play ? 'visible' : 'hidden' }

  return (
    <MotionTag className={className} initial="hidden" variants={container(delay, stagger)} {...trigger}>
      {lines.map((content, i) => (
        <span key={i} className={`mask-pad block overflow-hidden ${lineClassName}`}>
          <motion.span className="block origin-top-left" variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
