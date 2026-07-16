import { Link } from 'react-router-dom'
import ClipReveal from './ClipReveal'
import TiltCard from './TiltCard'
import { projects } from '../data/projects'
import { useRouteLoading } from '../RouteLoadingContext'

const TEASER_COUNT = 4

export default function PortfolioTeaser() {
  const teaser = projects.slice(0, TEASER_COUNT)
  const { startLoading } = useRouteLoading()

  return (
    <section id="work" className="bg-navy py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ClipReveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-4">
                Selected work
              </p>
              <h2 className="font-display font-700 text-3xl md:text-4xl text-cream tracking-tight">
                From neighbourhood favourites to corporate trust brands.
              </h2>
            </div>
            <Link
              to="/work"
              onClick={() => startLoading()}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal border-b border-teal/40 pb-1 hover:border-teal transition-colors"
            >
              View all work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </ClipReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {teaser.map((p, i) => (
            <ClipReveal key={p.name} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
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