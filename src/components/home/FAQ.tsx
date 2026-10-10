import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import { EASE_OUT } from '../../lib/motion'
import { CONTACT, whatsappLink } from '../../data/site'

export const faqs = [
  {
    q: 'How much does a website cost?',
    a: 'A landing page is RM 1,500, a 5–8 page business website starts from RM 3,800, and online stores start from RM 6,500. You get a fixed quote before we begin — no hourly billing and no surprise invoices.',
  },
  {
    q: 'How does payment work?',
    a: '50% to start the project and the remaining 50% on completion, before your website goes live.',
  },
  {
    q: 'Do I own my website and domain?',
    a: 'Yes. Your domain is registered in your name, and once the project is fully paid the website is 100% yours — including all the files and access.',
  },
  {
    q: 'Are there any yearly or monthly costs?',
    a: 'Only hosting and your domain. If you already have hosting, we can use it. Otherwise our Care Plan (RM 150/month) covers hosting, SSL, backups, updates and small edits. Domains usually cost around RM 50–150 a year.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Three rounds of revisions are included, so you can fine-tune the design and content before launch.',
  },
  {
    q: 'What do I need to prepare?',
    a: 'Just your logo, business details and any photos you already have. We handle the copywriting, structure and design — and we’ll tell you exactly what’s missing, if anything.',
  },
  {
    q: 'How long does a project take?',
    a: 'A landing page usually takes about a week, a business website 3–4 weeks, and an online store 6–8 weeks — depending on how quickly content and feedback come in.',
  },
  {
    q: 'Can I update the website myself?',
    a: 'Yes. We build on a system that’s easy to edit and walk you through it at handover. If you’d rather not touch it, the Care Plan includes small edits every month.',
  },
  {
    q: 'What is AI automation and do I need it?',
    a: 'AI automation removes repetitive manual tasks — appointment reminders, invoice follow-ups, replies to common questions. If your team sends the same messages or does the same admin every day, automation usually pays for itself within a few months.',
  },
  {
    q: 'What makes UPWRD different?',
    a: 'Website, automation and design are built as one connected system instead of being bought from three different vendors. Most studios do one of these; we plan all three together around what brings you more customers.',
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
                <a
                  href={whatsappLink('Hi UPWRD! I have a question about a website for my business.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent"
                >
                  Ask us on WhatsApp
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
