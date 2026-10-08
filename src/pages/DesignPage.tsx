import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import Lightbox from '../components/Lightbox'
import { designItems, shuffle } from '../data/designItems'
import { EASE_OUT } from '../lib/motion'

const categories = ['All', ...Array.from(new Set(designItems.map((i) => i.category)))]

export default function DesignPage() {
  const [active, setActive] = useState('All')
  const [items] = useState(() => shuffle(designItems))
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = active === 'All' ? items : items.filter((i) => i.category === active)

  return (
    <div className="bg-paper">
      <SEO
        title="Design Portfolio — Campaigns & Packaging"
        description="Social media campaigns, packaging design and marketing materials by UPWRD Studio for Malaysian F&B, beauty and furniture brands."
        path="/design"
      />

      <PageHeader eyebrow="Design portfolio" title="Design" count={designItems.length}>
        <p className="max-w-md text-[15px] leading-relaxed text-ink/65 md:text-base">
          Social campaigns, packaging and marketing collateral for F&amp;B, beauty and furniture brands.
        </p>
        <div className="-mx-1 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                active === c ? 'text-paper' : 'text-ink/65 hover:text-ink'
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="design-filter"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-3 pb-28 md:px-8 md:pb-40">
        <motion.div layout className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.image}
                type="button"
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.4), ease: EASE_OUT }}
                onClick={() => setLightboxIndex(items.indexOf(item))}
                data-cursor="Open"
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-ink/5 text-left md:mb-4"
              >
                <img
                  src={item.image}
                  alt={`${item.category} — ${item.title}`}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-2 bottom-2 translate-y-2 rounded-xl bg-ink/75 px-3 py-2 opacity-0 backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-accent-soft">
                    {item.category}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-white md:text-sm">{item.title}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Lightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </div>
  )
}
