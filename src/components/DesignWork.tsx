import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import Lightbox from './Lightbox'

type DesignItem = {
  title: string
  category: string
  image: string
}

function shuffle<T>(array: T[]) {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

const items: DesignItem[] = [
  { title: '12.12 Sale Banner', category: 'Butcher & Deli', image: '/images/design/butcher-1212sale.jpg' },
  { title: 'Meatballs Promo', category: 'Butcher & Deli', image: '/images/design/butcher-meatballs.jpg' },
  { title: "Mother's Day Campaign", category: 'Butcher & Deli', image: '/images/design/butcher-mothersday.jpg' },
  { title: "Single's Day Sale", category: 'Butcher & Deli', image: '/images/design/butcher-singlesday.jpg' },
  { title: 'Campaign Poster', category: 'Beauty & Wellness', image: '/images/design/ascobeaut-poster.jpg' },
  { title: 'Campaign Banner', category: 'Beauty & Wellness', image: '/images/design/ascobeaut-banner.jpg' },
  { title: 'Event Poster', category: 'Beauty & Wellness', image: '/images/design/cellrapy-event.jpg' },
  { title: 'Product Banner', category: 'Beauty & Wellness', image: '/images/design/cellrapy-banner.jpg' },
  { title: 'Sofa Promotion', category: 'Furniture & Home', image: '/images/design/ecofoya-sofa.jpg' },
  { title: 'Mattress Promotion', category: 'Furniture & Home', image: '/images/design/ecofoya-mattress.jpg' },
  { title: 'Custom Cabinetry Poster', category: 'Furniture & Home', image: '/images/design/cabinetry-poster.jpg' },
  { title: 'Product Packaging', category: 'Packaging Design', image: '/images/design/mrpig-packaging.jpg' },
  { title: 'Blind Box Packaging', category: 'Packaging Design', image: '/images/design/pigking-packaging.jpg' },
  { title: 'Promo Poster', category: 'Packaging Design', image: '/images/design/pigking-promo.jpg' },
  { title: 'Packaging Set', category: 'Packaging Design', image: '/images/design/pigking-boxes.jpg' },
]

const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))]

export default function DesignWork() {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [shuffledItems] = useState(() => shuffle(items))

  const filtered =
    active === 'All'
      ? shuffledItems
      : shuffledItems.filter((i) => i.category === active)

  return (
    <section id="design" className="bg-cream py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-xl mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-4">
              Design work
            </p>
            <h2 className="font-display font-700 text-3xl md:text-4xl text-navy tracking-tight">
              Campaigns, packaging, and promotions.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="relative font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-colors duration-200"
              >
                {active === c && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-navy rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === c ? 'text-cream' : 'text-ink/60 hover:text-navy'
                  }`}
                >
                  {c}
                </span>
                {active !== c && (
                  <span className="absolute inset-0 rounded-full border border-line" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="columns-3 md:columns-4 lg:columns-5 gap-2.5 md:gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {

              const globalIndex = shuffledItems.indexOf(item)

              return (
                <motion.button
                  key={item.image}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.025,
                    ease: [0.21, 0.47, 0.32, 0.98] as const,
                  }}
                  onClick={() => setLightboxIndex(globalIndex)}
                  className="group relative block w-full mb-2.5 md:mb-3 rounded-lg overflow-hidden border border-line bg-white text-left break-inside-avoid"
                >
                  <img
                    src={item.image}
                    alt={`${item.category} — ${item.title}`}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/0 to-navy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-teal">
                        {item.category}
                      </p>
                      <p className="font-display text-xs md:text-sm text-cream leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-navy/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F7F7F5" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        items={shuffledItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}