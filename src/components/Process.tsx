import { motion } from 'framer-motion'
import ClipReveal from './ClipReveal'
import KineticText from './KineticText'

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We audit your website, social presence, and branding to find where you\'re actually losing customers — not just what looks outdated.',
  },
  {
    n: '02',
    title: 'Build',
    desc: 'Website, automation, and design get built as one connected system, sequenced around what will move the needle first.',
  },
  {
    n: '03',
    title: 'Grow',
    desc: 'Ongoing maintenance, new automations, and monthly design support — so the system keeps working after launch.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
            How we work
          </p>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-navy tracking-tight">
            <KineticText text="A clear sequence, not a scramble." />
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((s, i) => (
            <ClipReveal key={s.n} delay={i * 0.15}>
              <div className="relative">
                <div className="font-mono text-teal-dim text-sm mb-4">{s.n}</div>
                <h3 className="font-display font-600 text-xl text-navy mb-3">{s.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-2 -right-4 h-px bg-line origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                    style={{ width: '2rem' }}
                  />
                )}
              </div>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  )
}