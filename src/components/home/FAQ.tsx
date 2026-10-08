import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import { EASE_OUT } from '../../lib/motion'
import { CONTACT } from '../../data/site'

export const faqs = [
  {
    q: 'How much does a website cost in Malaysia?',
    a: 'Most SME websites with UPWRD Studio range from RM 800 for a single landing page to RM 4,500 for a full business website with 5–8 pages. E-commerce builds start from RM 4,500. Pricing depends on scope, not hourly rate.',
  },
  {
    q: 'What is AI automation and do I need it?',
    a: 'AI automation removes repetitive manual tasks — appointment reminders, invoice follow-ups, email replies — using tools like n8n. If your team spends time on the same message or task daily, automation usually pays for itself within a few months.',
  },
  {
    q: 'Do you only work with restaurants and F&B businesses?',
    a: 'No. Past projects span restaurants, wine bars and corporate trust/fiduciary services. The approach applies to any SME regardless of industry.',
  },
  {
    q: 'How long does a typical website project take?',
    a: 'A landing page usually takes 1–2 weeks. A full business website takes 3–5 weeks depending on content readiness and revisions.',
  },
  {
    q: 'What makes UPWRD different from other agencies?',
    a: 'Website, automation and design are built as one connected system rather than sold separately. Most agencies specialise in one; UPWRD combines all three.',
  },
]

function Item({ q, a, open, onToggle, i }: { q: string; a: string; open: boolean; onToggle: () => void; i: number }) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
      >
        <span className="flex items-baseline gap-5">
          <span className="font-mono text-[11px] text-ink/45">0{i + 1}</span>
          <span className="text-xl font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent md:text-2xl">
            {q}
          </span>
        </span>
        <span
          className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
            open ? 'border-accent bg-accent text-white' : 'border-ink/15 text-ink'
          }`}
        >
          <span className="absolute h-[1.5px] w-3.5 bg-current" />
          <motion.span
            className="absolute h-3.5 w-[1.5px] bg-current"
            animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 pl-10 text-[15px] leading-relaxed text-ink/65 md:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-ink/10 bg-paper py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading index="06" label="FAQ" lines={['Questions,', 'answered.']} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-ink/65">
                Something else on your mind?{' '}
                <a href={`mailto:${CONTACT.email}`} className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">
                  Email us
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="border-t border-ink/10">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05} y={16}>
                <Item q={f.q} a={f.a} i={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
