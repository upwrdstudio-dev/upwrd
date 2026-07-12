import { motion } from 'framer-motion'
import Reveal from './Reveal'

const services = [
  {
    tag: 'WEB',
    title: 'Website Development',
    desc: 'WordPress builds designed to convert visitors into enquiries — landing pages, business sites, e-commerce, and redesigns.',
    items: ['Business & landing pages', 'E-commerce', 'Website redesigns', 'Ongoing maintenance'],
  },
  {
    tag: 'AUTO',
    title: 'AI Automation',
    desc: 'Built with n8n — automations that remove repetitive manual work from day-to-day operations.',
    items: ['Appointment reminders', 'Invoice automation', 'Email workflows', 'Custom multi-step automation'],
  },
  {
    tag: 'DSGN',
    title: 'Design',
    desc: 'Social media, marketing materials, and brand assets — consistent, on-brand, ready to publish.',
    items: ['Social media design', 'Brand asset kits', 'Posters & marketing collateral', 'Menus & flyers'],
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
              What we do
            </p>
            <h2 className="font-display font-700 text-3xl md:text-4xl text-navy tracking-tight">
              Three disciplines. One system.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full border border-line rounded-2xl p-8 bg-white hover:border-teal/50 hover:shadow-lg hover:shadow-navy/5 transition-[border-color,box-shadow] duration-300"
              >
                <span className="inline-block font-mono text-[11px] tracking-widest text-teal-dim bg-teal/10 px-2.5 py-1 rounded-full mb-6">
                  {s.tag}
                </span>
                <h3 className="font-display font-600 text-xl text-navy mb-3">{s.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                      <span className="text-teal-dim mt-1">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}