import ClipReveal from '../components/ClipReveal'
import TiltCard from '../components/TiltCard'
import { projects } from '../data/projects'

export default function WorkPage() {
  return (
    <section className="bg-navy py-24 md:py-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <ClipReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-4">
              Full portfolio
            </p>
            <h1 className="font-display font-700 text-4xl md:text-5xl text-cream tracking-tight">
              Every project, one page.
            </h1>
            <p className="text-cream/60 text-sm md:text-base leading-relaxed mt-5 max-w-lg">
              From neighbourhood restaurants to corporate trust brands — real
              client work, built with the same care regardless of size.
            </p>
          </div>
        </ClipReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ClipReveal key={p.name} delay={(i % 4) * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
              <TiltCard maxTilt={6} className="h-full">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl overflow-hidden border border-cream/10 bg-navy-light hover:border-teal/40 transition-colors duration-300"
                >
                  <div className="h-56 overflow-hidden bg-navy-dark">
                    <img
                      src={p.image}
                      alt={`${p.name} website screenshot`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-600 text-lg text-cream mb-2 flex items-center gap-2">
                      {p.name}
                      <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </a>
              </TiltCard>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  )
}