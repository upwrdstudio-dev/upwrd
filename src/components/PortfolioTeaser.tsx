import { Link } from 'react-router-dom'
import ClipReveal from './ClipReveal'
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
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-700 text-[13vw] md:text-7xl leading-[0.85] text-cream tracking-tight">
              Selected
              <br />
              work<span className="text-coral">.</span>
            </h2>
            <Link
              to="/work"
              onClick={() => startLoading()}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal border-b border-teal/40 pb-1 hover:border-teal transition-colors"
            >
              View all
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </ClipReveal>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {teaser.map((p, i) => (
            <ClipReveal key={p.name} delay={i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[280px] md:h-[380px] overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={`${p.name} website screenshot`}
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/0" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-teal">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-700 text-3xl md:text-4xl text-cream mt-1 flex items-center gap-3">
                    {p.name}
                    <span className="text-coral opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">↗</span>
                  </h3>
                  <p className="text-cream/50 text-xs mt-2 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.desc}
                  </p>
                </div>
              </a>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  )
}