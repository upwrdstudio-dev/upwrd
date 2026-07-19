import { motion } from 'framer-motion'
import ClipReveal from './ClipReveal'
import KineticText from './KineticText'
import Magnetic from './Magnetic'

const tiers = [
  { n: '01', tag: 'WEB', label: 'Website Development', from: 'RM 800' },
  { n: '02', tag: 'AUTO', label: 'AI Automation', from: 'RM 800' },
  { n: '03', tag: 'DSGN', label: 'Design', from: 'RM 80' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-6">
          Pricing
        </p>
        <h2 className="font-display font-700 text-4xl md:text-6xl text-navy tracking-tight mb-4 leading-[0.95]">
          <KineticText text="Priced on outcome, not hours." />
        </h2>
        <p className="text-ink/60 text-sm md:text-base max-w-md mb-16">
          Every quote is scoped to your business, not a fixed package. These are starting points.
        </p>

        <div className="mb-16">
          {tiers.map((t, i) => (
            <ClipReveal key={t.tag} delay={i * 0.08}>
              <div className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-10 border-b border-line py-8 md:py-10">
                <span className="font-mono text-xs text-ink/30 w-8 shrink-0">{t.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-teal-dim bg-teal/10 px-2.5 py-1 rounded-full w-fit shrink-0">
                  {t.tag}
                </span>
                <h3 className="font-display font-700 text-3xl md:text-4xl text-navy group-hover:text-teal-dim transition-colors duration-300 md:flex-1">
                  {t.label}
                </h3>
                <p className="font-display font-700 text-3xl md:text-4xl text-navy shrink-0">
                  {t.from}
                  <span className="text-sm font-body font-normal text-ink/40"> +</span>
                </p>
              </div>
            </ClipReveal>
          ))}
        </div>

        <ClipReveal delay={0.2}>
          <div className="relative rounded-2xl bg-navy p-10 md:p-16 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-0 md:opacity-100 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 25% 40%, rgba(255,107,74,0.18), transparent 60%)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="font-mono text-[11px] tracking-widest text-coral mb-3">SIGNATURE OFFER</p>
                <h3 className="font-display font-700 text-4xl md:text-6xl text-cream leading-[0.9] mb-4">
                  Digital
                  <br />
                  Foundation.
                </h3>
                <p className="text-cream/50 text-sm max-w-sm">
                  Website + 1 automation + 3 months of design support, bundled as one system.
                </p>
              </div>
              <Magnetic
                href="#contact"
                className="shrink-0 inline-flex items-center justify-center bg-teal text-navy font-medium text-sm px-8 py-4 rounded-full hover:bg-teal-dim transition-colors"
              >
                Get a quote
              </Magnetic>
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}