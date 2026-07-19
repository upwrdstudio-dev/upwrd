import ClipReveal from '../components/ClipReveal'
import SEO from '../components/SEO'
import { projects } from '../data/projects'
import { usePageReady } from '../hooks/usePageReady'

export default function WorkPage() {
  usePageReady()
  return (
    <div className="bg-navy min-h-screen">
      <SEO
        title="Our Work — Website Portfolio"
        description="Real client websites built by UPWRD Studio — restaurants, wine bars, seafood dining, and corporate trust services across Malaysia."
        path="/work"
      />

      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ClipReveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-6">
              Full portfolio
            </p>
            <h1 className="font-display font-700 text-[15vw] md:text-8xl leading-[0.82] text-cream tracking-tight">
              Every
              <br />
              project<span className="text-coral">.</span>
            </h1>
            <p className="text-cream/50 text-base md:text-lg leading-relaxed mt-8 max-w-md">
              From neighbourhood restaurants to corporate trust brands — real
              client work, built with the same care regardless of size.
            </p>
          </ClipReveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        {projects.map((p, i) => {
          const imageFirst = i % 2 === 0
          return (
            <ClipReveal key={p.name} delay={0}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid md:grid-cols-2 border-b border-cream/10"
              >
                <div
                  className={`relative h-[280px] md:h-[440px] overflow-hidden ${
                    imageFirst ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <img
                    src={p.image}
                    alt={`${p.name} website screenshot`}
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
                <div
                  className={`flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 ${
                    imageFirst ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <span className="font-mono text-xs text-teal mb-4">0{i + 1}</span>
                  <h2 className="font-display font-700 text-4xl md:text-6xl text-cream leading-[0.95] mb-4 flex items-center gap-4">
                    {p.name}
                    <span className="text-coral text-3xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      ↗
                    </span>
                  </h2>
                  <p className="text-cream/50 text-sm md:text-base leading-relaxed max-w-sm">
                    {p.desc}
                  </p>
                </div>
              </a>
            </ClipReveal>
          )
        })}
      </section>
    </div>
  )
}