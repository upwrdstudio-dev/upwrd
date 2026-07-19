import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ClipReveal from './ClipReveal'

const faqs = [
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
    a: 'No. Past projects span restaurants, wine bars, seafood dining, and corporate trust/fiduciary services. The approach applies to any SME regardless of industry.',
  },
  {
    q: 'How long does a typical website project take?',
    a: 'A landing page usually takes 1–2 weeks. A full business website takes 3–5 weeks depending on content readiness and revisions.',
  },
  {
    q: 'What makes UPWRD different from other agencies?',
    a: 'Website, automation, and design are built as one connected system rather than sold separately. Most agencies specialize in one; UPWRD combines all three.',
  },
]

function FAQRow({ f, i }: { f: (typeof faqs)[number]; i: number }) {
  const [open, setOpen] = useState(false)

  return (
    <ClipReveal delay={i * 0.05}>
      <div className="border-b border-line">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
        >
          <h3 className="font-display font-700 text-xl md:text-3xl text-navy group-hover:text-teal-dim transition-colors leading-tight">
            {f.q}
          </h3>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-line flex items-center justify-center text-navy text-xl font-light"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-ink/60 text-sm md:text-base leading-relaxed max-w-2xl pb-8">
                {f.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClipReveal>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-6">
          Common questions
        </p>
        <h2 className="font-display font-700 text-4xl md:text-6xl text-navy tracking-tight mb-16 leading-[0.95]">
          FAQ<span className="text-coral">.</span>
        </h2>

        <div>
          {faqs.map((f, i) => (
            <FAQRow key={f.q} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}