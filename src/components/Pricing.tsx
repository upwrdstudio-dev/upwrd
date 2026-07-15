import { motion } from 'framer-motion'
import ClipReveal from './ClipReveal'
import KineticText from './KineticText'
import TiltCard from './TiltCard'
import Magnetic from './Magnetic'

const tiers = [
  { tag: 'WEB', label: 'Website Development', from: 'RM 800' },
  { tag: 'AUTO', label: 'AI Automation', from: 'RM 800' },
  { tag: 'DSGN', label: 'Design', from: 'RM 80' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 md:py-32 border-y border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
            Pricing
          </p>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-navy tracking-tight mb-4">
            <KineticText text="Priced on outcome, not hours." />
          </h2>
          <p className="text-ink/70 text-sm leading-relaxed">
            Every quote is scoped to your business, not a fixed package. These are starting points.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tiers.map((t, i) => (
            <ClipReveal key={t.tag} delay={i * 0.1}>
              <TiltCard maxTilt={5} glare={false} className="h-full">
                <div className="h-full rounded-2xl border border-line p-8 hover:border-teal/40 hover:shadow-lg hover:shadow-navy/5 transition-[border-color,box-shadow] duration-300">
                  <span className="inline-block font-mono text-[11px] tracking-widest text-teal-dim bg-teal/10 px-2.5 py-1 rounded-full mb-6">
                    {t.tag}
                  </span>
                  <p className="text-ink/60 text-sm mb-2">{t.label}</p>
                  <p className="font-display font-700 text-3xl text-navy">
                    {t.from}
                    <span className="text-sm font-body font-normal text-ink/50"> +</span>
                  </p>
                </div>
              </TiltCard>
            </ClipReveal>
          ))}
        </div>

        <ClipReveal delay={0.3}>
          {/* Signature offer gets its own tilt + persistent glow sweep — it's
              the one card on the page meant to visually outrank the rest. */}
          <TiltCard maxTilt={4} glare={false}>
            <div className="relative rounded-2xl bg-navy p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-0 md:opacity-100 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 30% 50%, rgba(0,194,168,0.15), transparent 60%)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <p className="font-mono text-[11px] tracking-widest text-teal mb-2">SIGNATURE OFFER</p>
                <h3 className="font-display font-600 text-xl text-cream mb-2">Digital Foundation Package</h3>
                <p className="text-cream/60 text-sm max-w-md">
                  Website + 1 automation + 3 months of design support, bundled as one system.
                </p>
              </div>
              <Magnetic
                href="#contact"
                className="relative z-10 shrink-0 inline-flex items-center justify-center bg-teal text-navy font-medium text-sm px-6 py-3 rounded-full hover:bg-teal-dim transition-colors"
              >
                Get a quote
              </Magnetic>
            </div>
          </TiltCard>
        </ClipReveal>
      </div>
    </section>
  )
}