import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import { useMediaQuery } from '../../lib/useMediaQuery'
import { AutomationVisual, DesignVisual, WebVisual } from './ServiceVisuals'

type Service = {
  n: string
  title: string
  desc: string
  items: string[]
  from: string
  theme: string
  muted: string
  rule: string
  visual: ReactNode
  visualClass: string
}

const services: Service[] = [
  {
    n: '01',
    title: 'Website Development',
    desc: 'Fast, considered websites designed to turn visitors into enquiries — and easy for your team to keep up to date.',
    items: ['Business & landing pages', 'E-commerce', 'Website redesigns', 'Ongoing maintenance'],
    from: 'RM 1,500',
    theme: 'bg-white text-ink',
    muted: 'text-ink/65',
    rule: 'border-ink/10',
    visual: <WebVisual />,
    visualClass: 'bg-paper-dim p-5 md:p-10',
  },
  {
    n: '02',
    title: 'AI Automation',
    desc: 'Workflows built with n8n and AI that take repetitive work off your team — reminders, follow-ups, replies.',
    items: ['Appointment reminders', 'Invoice automation', 'Email & WhatsApp flows', 'Custom multi-step automation'],
    from: 'RM 1,200',
    theme: 'bg-ink-800 text-paper',
    muted: 'text-white/65',
    rule: 'border-white/10',
    visual: <AutomationVisual />,
    visualClass: 'bg-ink p-4 md:p-8',
  },
  {
    n: '03',
    title: 'Design',
    desc: 'Social media, marketing materials and brand assets — on-brand, consistent and ready to publish.',
    items: ['Social media design', 'Brand asset kits', 'Posters & collateral', 'Packaging, menus & flyers'],
    from: 'RM 150',
    theme: 'bg-accent text-white',
    muted: 'text-white/75',
    rule: 'border-white/20',
    visual: <DesignVisual />,
    visualClass: 'bg-accent-deep p-6 md:p-12',
  },
]

function ServiceCard({
  s,
  i,
  progress,
  range,
  targetScale,
  stack,
}: {
  s: Service
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  stack: boolean
}) {
  const scale = useTransform(progress, range, [1, targetScale])
  const dim = useTransform(progress, range, [0, i === services.length - 1 ? 0 : 0.2])

  const card = (
      <motion.article
        style={stack ? { scale, top: `calc(-3vh + ${i * 26}px)` } : undefined}
        className={`relative grid w-full max-w-7xl origin-top overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] lg:h-[min(80vh,640px)] lg:grid-cols-2 ${s.theme}`}
      >
        <div className="flex flex-col p-6 md:p-10 xl:p-12">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs opacity-60">({s.n})</span>
            <span className={`rounded-full border px-3 py-1 text-xs ${s.rule} ${s.muted}`}>From {s.from}</span>
          </div>
          <h3 className="mt-8 text-[2.4rem] font-medium leading-[0.95] tracking-tightest md:text-5xl lg:mt-auto lg:text-[3.25rem] xl:text-6xl">
            {s.title}
          </h3>
          <p className={`mt-4 max-w-md text-[15px] leading-relaxed md:text-base ${s.muted}`}>{s.desc}</p>
          <ul className={`mt-6 grid grid-cols-2 gap-x-6 border-t pt-5 text-[13px] md:mt-8 md:text-sm ${s.rule}`}>
            {s.items.map((it) => (
              <li key={it} className="flex items-center gap-2 py-1">
                <span className="h-1 w-1 shrink-0 bg-current opacity-60" />
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className={`flex h-56 items-center justify-center sm:h-72 lg:h-auto ${s.visualClass}`}>{s.visual}</div>
        {stack && <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />}
      </motion.article>
  )

  // Phones get a plain list. A tall stack of sticky, scale-transformed
  // sections is what threw off iOS Safari's placement of the top nav on
  // this page (drawn ~100pt low, so taps missed the menu button).
  if (!stack) return <Reveal className="py-1.5">{card}</Reveal>

  return <div className="sticky top-0 flex h-[100svh] items-center justify-center">{card}</div>
}

export default function Services() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const stack = useMediaQuery('(min-width: 768px)')

  return (
    <section id="services" className="bg-paper pt-8 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="01"
          label="Services"
          lines={['Three disciplines,', 'one system.']}
          aside={
            <p className="max-w-xs text-[15px] leading-relaxed text-ink/65">
              Most agencies specialise in one. We connect all three, so each part makes the others work harder.
            </p>
          }
        />
      </div>

      <div ref={container} className="relative mt-12 px-3 pb-20 md:mt-0 md:px-8 md:pb-[10vh]">
        {services.map((s, i) => {
          const start = i / services.length
          return (
            <ServiceCard
              key={s.n}
              s={s}
              i={i}
              progress={scrollYProgress}
              range={[start, 1]}
              targetScale={1 - (services.length - 1 - i) * 0.05}
              stack={stack}
            />
          )
        })}
      </div>
    </section>
  )
}
