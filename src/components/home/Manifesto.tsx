import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Eyebrow } from '../SectionHeading'
import Reveal from '../Reveal'

const statement =
  'Most agencies hand you a website and disappear. We build the system your business actually runs on — site, automations and design working as one — and we stay to keep it moving upward.'

const highlights = new Set(['system', 'one', 'upward.'])

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const accent = highlights.has(children)
  return (
    <span className="relative mr-[0.22em] inline-block">
      <motion.span style={{ opacity }} className={accent ? 'font-serif italic tracking-[-0.01em] text-accent' : undefined}>
        {children}
      </motion.span>
    </span>
  )
}

const pillars = [
  { k: '01', title: 'One system', body: 'Website, automation and design planned together, not bought from three vendors.' },
  { k: '02', title: 'Built on outcomes', body: 'Judged by enquiries won and hours saved — not by how it looks in a portfolio.' },
  { k: '03', title: 'Here after launch', body: 'Maintenance, new automations and monthly design support, long after go-live.' },
]

// The statement "reads itself": each word brightens as the paragraph scrolls
// through the viewport.
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')

  return (
    <section className="bg-paper py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal y={12}>
              <Eyebrow index="00" label="Why UPWRD" />
            </Reveal>
          </div>
          <p
            ref={ref}
            className="text-[8.2vw] font-medium leading-[1.08] tracking-[-0.04em] text-ink md:col-span-9 md:text-[3.4rem] lg:text-[4rem]"
          >
            {words.map((w, i) => {
              const start = i / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                  {w}
                </Word>
              )
            })}
          </p>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:mt-32 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1} className="h-full">
              <div className="group relative h-full bg-paper p-7 transition-colors duration-500 hover:bg-white md:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink/50">{p.k}</span>
                  <span className="h-2 w-2 bg-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-2" />
                </div>
                <h3 className="mt-14 text-2xl font-medium tracking-[-0.03em] md:mt-20">{p.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
