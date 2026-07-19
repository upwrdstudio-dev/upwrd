import ClipReveal from './ClipReveal'
import KineticText from './KineticText'

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We audit your website, social presence, and branding to find where you\'re actually losing customers.',
  },
  {
    n: '02',
    title: 'Build',
    desc: 'Website, automation, and design get built as one connected system, sequenced around what moves the needle first.',
  },
  {
    n: '03',
    title: 'Grow',
    desc: 'Ongoing maintenance, new automations, and monthly design support — the system keeps working after launch.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-navy py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-6">
          How we work
        </p>
        <h2 className="font-display font-700 text-4xl md:text-6xl text-cream tracking-tight mb-16 md:mb-20 leading-[0.95]">
          <KineticText text="A clear sequence, not a scramble." />
        </h2>

        <div>
          {steps.map((s, i) => (
            <ClipReveal key={s.n} delay={i * 0.1}>
              <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-10 border-b border-cream/10 py-8 md:py-10">
                <span className="font-display text-4xl md:text-5xl text-teal/40 group-hover:text-coral transition-colors duration-300 w-20 shrink-0">
                  {s.n}
                </span>
                <h3 className="font-display font-700 text-3xl md:text-4xl text-cream md:w-64 shrink-0">
                  {s.title}
                </h3>
                <p className="text-cream/50 text-sm md:text-base leading-relaxed max-w-md">
                  {s.desc}
                </p>
              </div>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  )
}