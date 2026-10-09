import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import ConceptShell from './ConceptShell'
import { useDemoAction } from './useDemoAction'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import CircleText from '../components/CircleText'
import { EASE_OUT } from '../lib/motion'

const IMG = '/images/concepts/ondeh'
const FONTS =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=DM+Sans:wght@400;500;600&display=swap'

// Palette: dough cream, pandan green, gula melaka caramel.
const C = {
  cream: '#F6EFE3',
  paper: '#FFFBF4',
  pandan: '#2D5A39',
  leaf: '#CFE2C0',
  gula: '#8C4A1F',
  ink: '#2A1E15',
}

const serif = "font-['Fraunces']"

const features = [
  {
    name: 'Pandan croissant',
    desc: '36-hour laminated dough, pandan custard, toasted coconut.',
    price: '12.90',
    img: `${IMG}/almond-croissant.jpg`,
    tag: 'Bestseller',
  },
  {
    name: 'Gula melaka kouign-amann',
    desc: 'Caramelised layers glazed with Melaka palm sugar.',
    price: '11.50',
    img: `${IMG}/pastries.jpg`,
    tag: 'Out by 11am',
  },
  {
    name: 'Ondeh-ondeh tart',
    desc: 'Buttery shell, gula melaka ganache, grated coconut.',
    price: '14.00',
    img: `${IMG}/tarts.jpg`,
    tag: 'Weekends',
  },
]

const menu: Record<string, { name: string; note: string; price: string }[]> = {
  Pastries: [
    { name: 'Butter croissant', note: 'French butter, 81 layers', price: '8.90' },
    { name: 'Kaya bun', note: 'House kaya, salted butter', price: '7.50' },
    { name: 'Pain au chocolat', note: '70% dark chocolate', price: '10.90' },
    { name: 'Durian danish', note: 'Seasonal · Musang King', price: '16.00' },
  ],
  Bread: [
    { name: 'Country sourdough', note: '48-hour ferment', price: '22.00' },
    { name: 'Milk bread loaf', note: 'Hokkaido-style, soft', price: '15.00' },
    { name: 'Pandan swirl brioche', note: 'Weekends only', price: '18.00' },
    { name: 'Focaccia slab', note: 'Rosemary, sea salt', price: '9.50' },
  ],
  Coffee: [
    { name: 'Kopi butter latte', note: 'Our house signature', price: '14.00' },
    { name: 'Flat white', note: 'Single-origin espresso', price: '12.00' },
    { name: 'Gula melaka iced latte', note: 'Palm sugar, oat optional', price: '15.00' },
    { name: 'Teh tarik', note: 'Pulled to order', price: '8.00' },
  ],
}

const hours = [
  ['Tuesday – Friday', '7:30am – 4pm'],
  ['Saturday – Sunday', '7:30am – 5pm'],
  ['Monday', 'Closed · we bake for wholesale'],
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 ${serif} text-2xl italic`} style={{ color: light ? C.cream : C.ink }}>
      ondeh
      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full" style={{ background: light ? C.leaf : C.pandan }} />
    </span>
  )
}

function ArchImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`isolate overflow-hidden [transform:translateZ(0)] ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.18 }} className="h-full w-full object-cover" />
    </div>
  )
}

export default function OndehBakehouse() {
  const [tab, setTab] = useState<keyof typeof menu>('Pastries')
  const { demo, toast } = useDemoAction('bg-[#2D5A39] text-[#F6EFE3]')
  const order = demo('On a live site, this opens WhatsApp with the order pre-filled for the bakery.')

  return (
    <ConceptShell
      title="Ondeh Bakehouse"
      description="A Malaysian–French bakehouse in Bangsar. Concept website by UPWRD Studio."
      fontsHref={FONTS}
      themeColor={C.pandan}
    >
      <div className="min-h-screen font-['DM_Sans'] antialiased" style={{ background: C.cream, color: C.ink }}>
        {/* Announcement */}
        <div className="overflow-hidden py-2 text-center text-[13px]" style={{ background: C.pandan, color: C.cream }}>
          Fresh batches at 8am, 10am &amp; 12pm daily · Closed Mondays
        </div>

        {/* Nav */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 text-[15px] md:flex">
            {['Menu', 'Our story', 'Coffee', 'Visit'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="relative transition-opacity hover:opacity-60">
                {l}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={order}
            className="rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: C.ink, color: C.cream }}
          >
            Order on WhatsApp
          </button>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 md:grid-cols-12 md:px-10 md:pb-28 md:pt-14">
          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px]"
              style={{ borderColor: `${C.ink}25` }}
            >
              <span className="text-[#E2A33B]">★★★★★</span> 4.9 from 1,200+ Google reviews
            </motion.p>
            <h1 className={`${serif} mt-6 text-[15vw] font-medium leading-[0.92] tracking-[-0.03em] md:text-[6.2rem]`}>
              {['Baked at dawn.', 'Gone by noon.'].map((line, i) => (
                <span key={line} className="-mx-[0.08em] -mb-[0.3em] block overflow-hidden px-[0.08em] pb-[0.3em]">
                  <motion.span
                    className={`block ${i === 1 ? 'italic' : ''}`}
                    style={i === 1 ? { color: C.pandan } : undefined}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
              className="mt-7 max-w-md text-lg leading-relaxed opacity-75"
            >
              A Malaysian–French bakehouse in Bangsar. Pandan croissants, gula melaka kouign-amann and kopi done
              properly — in small batches, every morning.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE_OUT }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={order}
                className="rounded-full px-7 py-4 font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: C.pandan, color: C.cream }}
              >
                Pre-order for pickup
              </button>
              <a
                href="#menu"
                className="rounded-full border px-7 py-4 font-medium transition-colors hover:bg-black/5"
                style={{ borderColor: `${C.ink}30` }}
              >
                See today's bakes
              </a>
            </motion.div>
          </div>

          <div className="relative md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
            >
              <ArchImage
                src={`${IMG}/croissants.jpg`}
                alt="Freshly baked croissants on a tray"
                className="ml-auto aspect-[4/5] w-[88%] rounded-t-[999px] rounded-b-[2rem]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE_OUT }}
              className="absolute bottom-8 left-3 h-36 w-36 md:-left-2 md:h-44 md:w-44"
            >
              <span className="absolute -inset-7 rounded-full" style={{ background: C.cream }} />
              <img src={`${IMG}/latte.jpg`} alt="Latte being poured" className="relative h-full w-full rounded-full object-cover" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: C.pandan }}>
                <CircleText
                  text="Baked fresh daily · Kopi on tap · Bangsar KL · "
                  className="animate-[spin-slow_18s_linear_infinite] text-[10px] font-medium uppercase [--r:91px] md:text-[11.5px] md:[--r:107px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marquee */}
        <div className="border-y py-5" style={{ borderColor: `${C.ink}18`, background: C.paper }}>
          <Marquee speed={40}>
            {['Pandan croissant', 'Kaya bun', 'Gula melaka kouign-amann', 'Ondeh-ondeh tart', 'Kopi butter latte', 'Country sourdough'].map((t) => (
              <span key={t} className={`${serif} flex items-center whitespace-nowrap text-3xl italic md:text-4xl`}>
                <span className="px-6">{t}</span>
                <span style={{ color: C.pandan }}>✿</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Signature bakes */}
        <section id="menu" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em]" style={{ color: C.gula }}>
              Today's bakes
            </p>
            <h2 className={`${serif} mt-3 max-w-2xl text-5xl leading-[1] tracking-[-0.02em] md:text-7xl`}>
              Three reasons people <span className="italic" style={{ color: C.pandan }}>queue</span> at 8am.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group overflow-hidden rounded-[2rem] p-3"
                  style={{ background: C.paper }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <img src={f.img} alt={f.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium" style={{ background: C.cream }}>
                      {f.tag}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <h3 className={`${serif} text-2xl`}>{f.name}</h3>
                      <p className="mt-1 text-sm opacity-65">{f.desc}</p>
                    </div>
                    <p className={`${serif} shrink-0 text-xl`} style={{ color: C.gula }}>
                      RM{f.price}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>

          {/* Full menu */}
          <Reveal className="mt-20" y={24}>
            <div style={{ background: C.paper }} className="rounded-[2rem] p-6 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h3 className={`${serif} text-4xl`}>The full counter</h3>
                <div className="flex gap-1 rounded-full p-1" style={{ background: C.cream }}>
                  {(Object.keys(menu) as (keyof typeof menu)[]).map((k) => (
                    <button key={k} type="button" onClick={() => setTab(k)} className="relative rounded-full px-5 py-2 text-sm font-medium">
                      {tab === k && (
                        <motion.span
                          layoutId="ondeh-tab"
                          className="absolute inset-0 rounded-full"
                          style={{ background: C.pandan }}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative" style={{ color: tab === k ? C.cream : C.ink }}>
                        {k}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="mt-8 grid gap-x-12 md:grid-cols-2"
                >
                  {menu[tab].map((m) => (
                    <li key={m.name} className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: `${C.ink}14` }}>
                      <div>
                        <p className={`${serif} text-xl`}>{m.name}</p>
                        <p className="text-sm opacity-60">{m.note}</p>
                      </div>
                      <span className="flex-1 border-b border-dotted" style={{ borderColor: `${C.ink}35` }} />
                      <span className="font-medium" style={{ color: C.gula }}>
                        RM{m.price}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        {/* Story */}
        <section id="our-story" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 md:grid-cols-2 md:px-10 md:pb-32">
          <ArchImage src={`${IMG}/flour.jpg`} alt="Baker dusting flour over dough" className="aspect-[4/5] rounded-[2rem]" />
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em]" style={{ color: C.gula }}>
              Our story
            </p>
            <h2 className={`${serif} mt-3 text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl`}>
              French technique, <span className="italic" style={{ color: C.pandan }}>kampung</span> flavours.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed opacity-75">
              We trained in Paris and came home missing two things: real butter croissants and our grandmother's
              ondeh-ondeh. So we put them together. Our bakers start at 4am, so the first batch is still warm when you
              walk in.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-8" style={{ borderColor: `${C.ink}18` }}>
              {[
                ['36h', 'laminated dough'],
                ['3', 'fresh batches daily'],
                ['100%', 'Melaka gula'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className={`${serif} text-4xl`} style={{ color: C.pandan }}>
                    {n}
                  </dt>
                  <dd className="mt-1 text-sm opacity-65">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Coffee */}
        <section id="coffee" style={{ background: C.pandan, color: C.cream }}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
            <Reveal>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: C.leaf }}>
                Coffee bar
              </p>
              <h2 className={`${serif} mt-3 text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl`}>
                A croissant deserves a <span className="italic">proper</span> kopi.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed opacity-80">
                Single-origin espresso from a roaster in Ipoh, plus our house kopi butter latte — rich, nutty, and the
                reason half our regulars come back.
              </p>
              <button
                type="button"
                onClick={order}
                className="mt-9 rounded-full px-7 py-4 font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: C.cream, color: C.pandan }}
              >
                Order ahead, skip the queue
              </button>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <ArchImage src={`${IMG}/coffee.jpg`} alt="Latte art on coffee beans" className="aspect-[3/4] rounded-t-[999px] rounded-b-[1.5rem]" />
              <ArchImage src={`${IMG}/latte.jpg`} alt="Latte being poured" className="mt-16 aspect-[3/4] rounded-[1.5rem]" />
            </div>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em]" style={{ color: C.gula }}>
              Visit us
            </p>
            <h2 className={`${serif} mt-3 text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl`}>
              Come early. <span className="italic" style={{ color: C.pandan }}>Seriously.</span>
            </h2>
            <ul className="mt-10">
              {hours.map(([d, h]) => (
                <li key={d} className="flex justify-between gap-6 border-b py-4 text-lg" style={{ borderColor: `${C.ink}18` }}>
                  <span>{d}</span>
                  <span className="text-right opacity-70">{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg">Bangsar, Kuala Lumpur</p>
            <p className="opacity-60">Free parking behind the shop after 10am</p>
          </Reveal>
          <Reveal delay={0.15}>
            <button
              type="button"
              onClick={demo('On a live site, this opens Google Maps directions to the bakery.')}
              className="group relative block aspect-square w-full overflow-hidden rounded-[2rem] text-left"
              style={{ background: C.leaf }}
            >
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {[60, 140, 230, 320].map((y) => (
                  <path key={`h${y}`} d={`M-20 ${y} Q200 ${y + 30} 420 ${y - 10}`} stroke={C.paper} strokeWidth="14" fill="none" />
                ))}
                {[90, 210, 310].map((x) => (
                  <path key={`v${x}`} d={`M${x} -20 Q${x + 25} 200 ${x - 15} 420`} stroke={C.paper} strokeWidth="10" fill="none" />
                ))}
                <circle cx="200" cy="200" r="60" fill={C.pandan} opacity="0.12" className="origin-center animate-ping" />
              </svg>
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                <span className={`${serif} rounded-full px-4 py-2 text-lg italic shadow-lg`} style={{ background: C.ink, color: C.cream }}>
                  ondeh
                </span>
                <span className="h-3 w-0.5" style={{ background: C.ink }} />
              </span>
              <span className="absolute bottom-5 left-5 rounded-full px-5 py-3 text-sm font-medium transition-transform group-hover:-translate-y-1" style={{ background: C.paper }}>
                Get directions →
              </span>
            </button>
          </Reveal>
        </section>

        {/* Gallery */}
        <section className="grid grid-cols-2 gap-2 px-2 md:grid-cols-4">
          {['batch', 'bench', 'space', 'pastries'].map((n, i) => (
            <Reveal key={n} delay={i * 0.06} y={20}>
              <div className="group aspect-square overflow-hidden rounded-2xl">
                <img src={`${IMG}/${n}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </Reveal>
          ))}
        </section>

        {/* Footer */}
        <footer style={{ background: C.ink, color: C.cream }} className="mt-2">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-24 pt-16 md:flex-row md:items-end md:justify-between md:px-10">
            <div>
              <p className={`${serif} text-[22vw] italic leading-[0.8] md:text-[11rem]`}>
                ondeh<span style={{ color: C.leaf }}>.</span>
              </p>
              <p className="mt-6 opacity-60">Malaysian–French bakehouse · Bangsar, KL</p>
            </div>
            <div className="flex gap-6 text-sm opacity-80">
              <button type="button" onClick={demo('On a live site, this opens the bakery’s Instagram.')} className="hover:opacity-60">
                Instagram
              </button>
              <button type="button" onClick={order} className="hover:opacity-60">
                WhatsApp
              </button>
              <a href="#menu" className="hover:opacity-60">
                Menu
              </a>
            </div>
          </div>
        </footer>
      </div>
      {toast}
    </ConceptShell>
  )
}
