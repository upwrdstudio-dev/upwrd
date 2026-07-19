import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'

const services = [
  {
    n: '01',
    tag: 'WEB',
    title: 'Website Development',
    desc: 'WordPress builds designed to convert visitors into enquiries.',
    items: ['Business & landing pages', 'E-commerce', 'Website redesigns', 'Ongoing maintenance'],
  },
  {
    n: '02',
    tag: 'AUTO',
    title: 'AI Automation',
    desc: 'Built with n8n — removing repetitive manual work from operations.',
    items: ['Appointment reminders', 'Invoice automation', 'Email workflows', 'Custom multi-step automation'],
  },
  {
    n: '03',
    tag: 'DSGN',
    title: 'Design',
    desc: 'Social media, marketing materials, and brand assets, ready to publish.',
    items: ['Social media design', 'Brand asset kits', 'Posters & marketing collateral', 'Menus & flyers'],
  },
]

function ServiceRow({ s, index }: { s: (typeof services)[number]; index: number }) {
  const [hover, setHover] = useState(false)

  return (
    <Reveal delay={index * 0.08}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative border-b border-line py-10 md:py-14 cursor-default"
      >
        <div className="flex items-start md:items-center gap-6 md:gap-12">
          <span className="font-mono text-xs md:text-sm text-ink/30 pt-2 md:pt-0 shrink-0 w-8">
            {s.n}
          </span>

          <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8">
            <h3 className="font-display font-700 text-[9vw] md:text-6xl leading-[0.95] text-navy group-hover:text-teal-dim transition-colors duration-300">
              {s.title}
            </h3>
            <p className="hidden md:block text-ink/50 text-sm max-w-xs text-right shrink-0">
              {s.desc}
            </p>
          </div>

          <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-teal-dim bg-teal/10 px-2.5 py-1 rounded-full shrink-0">
            {s.tag}
          </span>
        </div>

        <div className="md:hidden mt-4 pl-14 flex flex-wrap gap-x-4 gap-y-1">
          {s.items.map((it) => (
            <span key={it} className="text-xs text-ink/50">{it}</span>
          ))}
        </div>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block overflow-hidden"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-2 pl-20 pt-6">
                {s.items.map((it) => (
                  <span key={it} className="font-mono text-xs text-ink/60">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
            What we do
          </p>
        </Reveal>

        <div className="mt-6">
          {services.map((s, i) => (
            <ServiceRow key={s.tag} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}