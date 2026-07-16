import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { designItems, shuffle } from '../data/designItems'
import { useRouteLoading } from '../RouteLoadingContext'

const TEASER_COUNT = 6

export default function DesignTeaser() {
  const [sample] = useState(() => shuffle(designItems).slice(0, TEASER_COUNT))
  const { startLoading } = useRouteLoading()

  return (
    <section id="design" className="bg-cream py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
                Design work
              </p>
              <h2 className="font-display font-700 text-3xl md:text-4xl text-navy tracking-tight">
                Campaigns, packaging, and promotions.
              </h2>
            </div>
            <Link
              to="/design"
              onClick={() => startLoading()}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal-dim border-b border-teal-dim/40 pb-1 hover:border-teal-dim transition-colors"
            >
              View all design work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sample.map((item, i) => (
            <Reveal key={item.image} delay={i * 0.05}>
              <Link
                to="/design"
                onClick={() => startLoading()}
                className="group relative block aspect-[4/5] rounded-lg overflow-hidden border border-line bg-navy-dark"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-125 blur-xl opacity-50"
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-navy-dark/30" aria-hidden="true" />
                <img
                  src={item.image}
                  alt={`${item.category} — ${item.title}`}
                  className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-teal">
                    {item.category}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}