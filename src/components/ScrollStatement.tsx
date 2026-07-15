import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const statement =
  "Most agencies sell you a website and disappear. We build the system your business actually runs on — and stay to make sure it keeps working."

function ScrubWord({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(progress, range, ['#B8BCC2', '#0F1B2D'])
  return (
    <motion.span style={{ opacity, color }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

export default function ScrollStatement() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.15'],
  })

  const words = statement.split(' ')

  return (
    <section ref={ref} className="bg-cream py-28 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-display font-600 text-2xl md:text-4xl leading-snug tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length
            const end = Math.min(start + 1.5 / words.length, 1)
            return (
              <ScrubWord key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrubWord>
            )
          })}
        </p>
      </div>
    </section>
  )
}