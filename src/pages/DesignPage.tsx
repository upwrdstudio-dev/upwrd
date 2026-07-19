import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import SEO from '../components/SEO'
import { designItems, shuffle } from '../data/designItems'
import { usePageReady } from '../hooks/usePageReady'

const categories = ['All', ...Array.from(new Set(designItems.map((i) => i.category)))]

export default function DesignPage() {
  usePageReady()
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [shuffledItems] = useState(() => shuffle(designItems))

  const filtered =
    active === 'All' ? shuffledItems : shuffledItems.filter((i) => i.category === active)

  return (
    <section className="bg-cream pt-32 md:pt-40 pb-24 md:pb-32 min-h-screen">
      <SEO
        title="Design Portfolio — Campaigns & Packaging"
        description="Social media campaigns, packaging design, and marketing materials by UPWRD Studio for Malaysian F&B, beauty, and furniture brands."
        path="/design"
      />
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-6">
              Full design portfolio
            </p>
            <h1 className="font-display font-700 text-[15vw] md:text-8xl leading-[0.82] text-navy tracking-tight">
              Campaigns
              <br />
              &amp; work<span className="text-coral">.</span>
            </h1>
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
                    layoutId="active-pill-design-page"
                    className="absolute inset-0 bg-navy rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active === c ? 'text-cream' : 'text-ink/60 hover:text-navy'}`}>
                  {c}
                </span>
                {active !== c && <span className="absolute inset-0 rounded-full border border-line" />}
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
                  transition={{ duration: 0.3, delay: i * 0.02, ease: [0.21, 0.47, 0.32, 0.98] }}
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
                      <p className="font-mono text-[8px] uppercase tracking-widest text-teal">{item.category}</p>
                      <p className="font-display text-xs md:text-sm text-cream leading-tight">{item.title}</p>
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