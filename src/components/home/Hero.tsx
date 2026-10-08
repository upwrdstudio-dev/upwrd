import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroShader from './HeroShader'
import TextReveal from '../TextReveal'
import Button from '../Button'
import { useIntroDone } from '../../lib/intro'
import { EASE_OUT } from '../../lib/motion'

export default function Hero() {
  const ready = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1, delay, ease: EASE_OUT },
  })

  return (
    <section ref={ref} data-nav="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <HeroShader className="absolute inset-0" />
      </motion.div>

      {/* Faint column guides give the open field some architecture. */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl grid-cols-4 px-8 md:grid" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l border-white/[0.06] last:border-r" />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-8 pt-28 md:px-8 md:pb-12 md:pt-32"
      >
        <motion.div
          {...fade(0.3)}
          className="flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-white/60"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-soft" />
            </span>
            Digital studio
          </span>
          <span>Malaysia</span>
        </motion.div>

        <div>
          <TextReveal
            as="h1"
            play={ready}
            stagger={0.1}
            lines={[
              'Digital systems',
              'that move you',
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">upward.</span>,
            ]}
            className="text-[11.5vw] font-medium leading-[0.9] tracking-tightest md:text-[8vw] 2xl:text-[8.75rem]"
          />

          <div className="mt-10 grid gap-8 border-t border-white/15 pt-6 md:mt-14 md:grid-cols-12 md:items-center">
            <motion.p {...fade(0.5)} className="max-w-md text-base leading-relaxed text-white/65 md:col-span-6 md:text-lg">
              Websites, AI automation and design — built as one connected system for Malaysian businesses that want
              less busywork and more growth.
            </motion.p>
            <motion.div {...fade(0.6)} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <Button to="/#contact" variant="accent">
                Start a project
              </Button>
              <Button to="/#work" variant="outline-light">
                See our work
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
