import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import SectionHeading from '../SectionHeading'

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: "We audit your website, social presence and branding to find where you're actually losing customers.",
    points: ['Business & customer audit', 'Clear scope and quote'],
  },
  {
    n: '02',
    title: 'Build',
    desc: 'Website, automation and design are built as one connected system, sequenced around what moves the needle first.',
    points: ['Design & development', 'Automation set-up'],
  },
  {
    n: '03',
    title: 'Grow',
    desc: 'Maintenance, new automations and monthly design support — the system keeps working long after launch.',
    points: ['Ongoing support', 'Monthly design'],
  },
]

function Step({ step, i, progress }: { step: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const at = i / steps.length + 0.05
  const lit = useTransform(progress, [at - 0.05, at], [0, 1])
  const color = useTransform(lit, [0, 1], ['rgba(255,255,255,0.18)', '#2B5BFF'])
  const textOpacity = useTransform(lit, [0, 1], [0.35, 1])

  return (
    <motion.div style={{ opacity: textOpacity }} className="relative pl-10 md:pl-0 md:pt-14">
      <motion.span
        style={{ backgroundColor: color }}
        className="absolute left-[3px] top-1.5 h-3 w-3 md:left-0 md:top-[-5px]"
      />
      <span className="font-mono text-xs text-white/50">({step.n})</span>
      <h3 className="mt-3 text-4xl font-medium tracking-tightest md:text-5xl">{step.title}</h3>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65">{step.desc}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {step.points.map((p) => (
          <li key={p} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65">
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// Steps light up one by one as a rail fills with scroll.
export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })

  return (
    <section id="process" data-nav="dark" className="bg-ink py-28 text-paper md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="04"
          label="Process"
          tone="dark"
          lines={['A clear sequence,', 'not a scramble.']}
          aside={
            <p className="max-w-xs text-[15px] leading-relaxed text-white/65">
              A landing page usually takes 1–2 weeks. A full business website, 3–5 weeks.
            </p>
          }
        />

        <div ref={ref} className="relative mt-20 grid gap-14 md:mt-28 md:grid-cols-3 md:gap-10">
          <div className="absolute bottom-0 left-[8px] top-0 w-px bg-white/10 md:bottom-auto md:left-0 md:right-0 md:top-0 md:h-px md:w-auto">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-accent md:hidden"
            />
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="hidden h-full w-full origin-left bg-accent md:block"
            />
          </div>
          {steps.map((s, i) => (
            <Step key={s.n} step={s} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
