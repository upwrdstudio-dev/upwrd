import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import ConceptShell from './ConceptShell'
import { useDemoAction } from './useDemoAction'
import Reveal from '../components/Reveal'
import { EASE_OUT, hasFinePointer } from '../lib/motion'

const IMG = '/images/concepts/halia'
const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap'

// Palette: warm sand, linen, clay and a ginger accent.
const C = {
  sand: '#EFE6DA',
  linen: '#F8F3EC',
  clay: '#6B4433',
  deep: '#2B211C',
  sage: '#8C9A7E',
  ginger: '#C4843F',
}

const serif = "font-['Cormorant_Garamond']"

const treatments = [
  { name: 'Ginger Ritual Massage', mins: 90, price: 280, img: 'massage', note: 'Warm ginger oil, deep-tissue pressure, scalp release.' },
  { name: 'Hot Stone Therapy', mins: 75, price: 250, img: 'stones', note: 'Basalt stones melt tension in back and shoulders.' },
  { name: 'Brightening Facial', mins: 60, price: 220, img: 'facial', note: 'Vitamin C peel, lymphatic massage, hydrating mask.' },
  { name: 'Clay Detox Facial', mins: 60, price: 200, img: 'clay', note: 'Kaolin clay, steam, extraction and calming serum.' },
  { name: 'Couples Retreat', mins: 120, price: 560, img: 'mask', note: 'Side-by-side massage, facial and ginger tea ritual.' },
]

const steps = [
  { n: 'I', title: 'Arrive', body: 'Ginger tea and a warm foot soak while we talk through what your body needs today.' },
  { n: 'II', title: 'Unwind', body: 'Your treatment, in a private suite with heated beds and no clocks on the wall.' },
  { n: 'III', title: 'Linger', body: 'Stay in the relaxation lounge as long as you like. There’s no rush here.' },
]

const products = [
  { name: 'Halia Body Oil', size: '100ml', price: 128, img: 'serum' },
  { name: 'Linen Bath Ritual', size: 'Set of 3', price: 168, img: 'towel' },
  { name: 'Ginger Rose Bath Salt', size: '250g', price: 96, img: 'bath-salt' },
]

const quotes = [
  { q: 'The most unhurried hour I’ve had all year. I walked out feeling two inches taller.', who: 'Guest, Mont Kiara' },
  { q: 'Finally a spa in KL that actually listens before they start. The ginger massage is unreal.', who: 'Guest, Bangsar' },
  { q: 'Booked the couples retreat for our anniversary — we’re already members now.', who: 'Guest, Petaling Jaya' },
]

const SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30']

function useNextDays(count: number) {
  return useMemo(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    return Array.from({ length: count }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      const [weekday, ...rest] = fmt.format(d).replace(',', '').split(' ')
      return { key: d.toDateString(), weekday, date: rest.join(' '), seed: d.getDate() }
    })
  }, [count])
}

function TreatmentList() {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 24 })
  const sy = useSpring(y, { stiffness: 200, damping: 24 })
  const fine = useMemo(hasFinePointer, [])
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={listRef}
      className="relative"
      onPointerMove={(e) => {
        const r = listRef.current?.getBoundingClientRect()
        if (!r) return
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onPointerLeave={() => setActive(null)}
    >
      {treatments.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.06} y={16}>
          <div
            onPointerEnter={() => setActive(i)}
            className="group grid cursor-default grid-cols-[1fr_auto] items-center gap-4 border-b py-6 md:grid-cols-[3rem_1fr_8rem_6rem] md:py-8"
            style={{ borderColor: `${C.deep}1f` }}
          >
            <span className={`${serif} hidden text-lg italic opacity-50 md:block`}>0{i + 1}</span>
            <div className="flex items-center gap-4">
              <img src={`${IMG}/${t.img}.jpg`} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover md:hidden" />
              <div>
                <h3 className={`${serif} text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl`}>
                  {t.name}
                </h3>
                <p className="mt-1 max-w-md text-sm opacity-60 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-70">
                  {t.note}
                </p>
              </div>
            </div>
            <span className="hidden text-sm uppercase tracking-[0.2em] opacity-60 md:block">{t.mins} min</span>
            <span className={`${serif} text-right text-2xl`} style={{ color: C.clay }}>
              RM {t.price}
            </span>
          </div>
        </Reveal>
      ))}

      {fine && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {active !== null && (
              <motion.img
                key={active}
                src={`${IMG}/${treatments[active].img}.jpg`}
                alt=""
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="absolute -left-36 -top-48 h-64 w-52 rounded-[999px] object-cover shadow-2xl"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

function BookingWidget({ onRequest }: { onRequest: (e?: { preventDefault: () => void }) => void }) {
  const days = useNextDays(7)
  const [treatment, setTreatment] = useState(0)
  const [day, setDay] = useState(days[0].key)
  const [slot, setSlot] = useState<string | null>(null)
  const seed = days.find((d) => d.key === day)?.seed ?? 1
  // Deterministic "already booked" slots per day so the widget feels real.
  const taken = (s: string, idx: number) => (idx * 7 + seed) % 5 === 0 || s === '13:00'
  const t = treatments[treatment]

  return (
    <div className="grid overflow-hidden rounded-[2rem] md:grid-cols-[1.4fr_1fr]" style={{ background: C.linen }}>
      <div className="space-y-8 p-6 md:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">1 · Treatment</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {treatments.map((tr, i) => (
              <button
                key={tr.name}
                type="button"
                onClick={() => setTreatment(i)}
                className="relative rounded-full border px-4 py-2 text-sm transition-colors"
                style={{ borderColor: `${C.deep}25`, color: treatment === i ? C.linen : C.deep }}
              >
                {treatment === i && (
                  <motion.span layoutId="halia-treatment" className="absolute inset-0 rounded-full" style={{ background: C.clay }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{tr.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">2 · Day</p>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setDay(d.key)
                  setSlot(null)
                }}
                className="rounded-2xl border px-2 py-3 text-center transition-colors"
                style={{
                  borderColor: day === d.key ? C.clay : `${C.deep}20`,
                  background: day === d.key ? `${C.clay}12` : 'transparent',
                }}
              >
                <span className="block text-xs uppercase tracking-wider opacity-60">{d.weekday}</span>
                <span className={`${serif} block text-xl`}>{d.date.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">3 · Time</p>
          <motion.div key={day} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 grid grid-cols-4 gap-2">
            {SLOTS.map((s, idx) => {
              const off = taken(s, idx)
              return (
                <button
                  key={s}
                  type="button"
                  disabled={off}
                  onClick={() => setSlot(s)}
                  className="rounded-xl border py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:line-through disabled:opacity-35"
                  style={{
                    borderColor: slot === s ? C.clay : `${C.deep}20`,
                    background: slot === s ? C.clay : 'transparent',
                    color: slot === s ? C.linen : C.deep,
                  }}
                >
                  {s}
                </button>
              )
            })}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 md:p-10" style={{ background: C.deep, color: C.linen }}>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">Your booking</p>
          <AnimatePresence mode="wait">
            <motion.div key={t.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              <h4 className={`${serif} mt-4 text-4xl leading-tight`}>{t.name}</h4>
              <p className="mt-2 text-sm opacity-60">{t.mins} minutes</p>
            </motion.div>
          </AnimatePresence>
          <dl className="mt-8 space-y-3 border-t pt-6 text-sm" style={{ borderColor: `${C.linen}20` }}>
            <div className="flex justify-between">
              <dt className="opacity-60">Day</dt>
              <dd>{days.find((d) => d.key === day)?.weekday}, {days.find((d) => d.key === day)?.date}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-60">Time</dt>
              <dd>{slot ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-60">Total</dt>
              <dd className={`${serif} text-2xl`}>RM {t.price}</dd>
            </div>
          </dl>
        </div>
        <button
          type="button"
          disabled={!slot}
          onClick={onRequest}
          className="rounded-full py-4 text-sm uppercase tracking-[0.2em] transition-all disabled:opacity-40"
          style={{ background: C.ginger, color: C.deep }}
        >
          {slot ? 'Request booking' : 'Pick a time'}
        </button>
      </div>
    </div>
  )
}

function Quotes() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 5200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="relative min-h-[11rem] md:min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className={`${serif} text-3xl italic leading-snug md:text-5xl`}>“{quotes[i].q}”</p>
            <footer className="mt-6 text-xs uppercase tracking-[0.25em] opacity-60">{quotes[i].who}</footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {quotes.map((_, n) => (
          <button key={n} type="button" aria-label={`Quote ${n + 1}`} onClick={() => setI(n)} className="h-1.5 rounded-full transition-all" style={{ width: n === i ? 28 : 8, background: n === i ? C.clay : `${C.deep}30` }} />
        ))}
      </div>
    </div>
  )
}

export default function HaliaHouse() {
  const { demo, toast } = useDemoAction('bg-[#2B211C] text-[#F8F3EC]')
  const book = demo('On a live site, this sends the booking request to the spa’s WhatsApp or booking system.')
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const heroText = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <ConceptShell
      title="Halia House"
      description="Spa & skin studio in Damansara Heights. Concept website by UPWRD Studio."
      fontsHref={FONTS}
      themeColor={C.deep}
    >
      <div className="min-h-screen font-['Jost'] font-light antialiased" style={{ background: C.sand, color: C.deep }}>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[100svh] min-h-[620px] overflow-hidden" style={{ color: C.linen }}>
          <motion.img
            src={`${IMG}/stones.jpg`}
            alt="Hot stone massage"
            style={{ scale: heroScale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
            <span className={`${serif} text-2xl tracking-[0.18em]`}>HALIA HOUSE</span>
            <nav className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
              {['Treatments', 'Ritual', 'Shop', 'Visit'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                  {l}
                </a>
              ))}
            </nav>
            <a href="#book" className="rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors hover:bg-white/15" style={{ borderColor: `${C.linen}66` }}>
              Book
            </a>
          </header>

          <motion.div style={{ y: heroText }} className="relative z-10 mx-auto flex h-[calc(100%-88px)] max-w-7xl flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
            <h1 className={`${serif} text-[17vw] font-normal leading-[0.85] md:text-[9.5rem]`}>
              {['Slow down.', 'Breathe in'].map((line, i) => (
                <span key={line} className="-mx-[0.08em] -mb-[0.3em] block overflow-hidden px-[0.08em] pb-[0.3em]">
                  <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.2 + i * 0.12, ease: EASE_OUT }}>
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="-mx-[0.08em] -mb-[0.3em] block overflow-hidden px-[0.08em] pb-[0.3em]">
                <motion.span className="block italic" style={{ color: '#F2C48D' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.44, ease: EASE_OUT }}>
                  ginger.
                </motion.span>
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
              style={{ borderColor: `${C.linen}40` }}
            >
              <p className="max-w-sm opacity-85">A spa &amp; skin studio rooted in Malay healing traditions — warm ginger, slow hands, and nowhere to be.</p>
              <p className="uppercase tracking-[0.2em] opacity-85">Open today · 10am – 9pm · Damansara Heights</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
          <Reveal>
            <svg viewBox="0 0 120 40" className="mx-auto h-8 w-24" style={{ color: C.sage }} aria-hidden="true">
              <path d="M2 30 C30 30 40 6 60 6 S90 30 118 30" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="60" cy="6" r="3" fill="currentColor" />
            </svg>
            <p className={`${serif} mt-8 text-3xl leading-snug md:text-5xl`}>
              Every treatment begins with <em style={{ color: C.clay }}>halia</em> — ginger — the root our grandmothers used to warm the body,
              ease the mind and bring you back to yourself.
            </p>
          </Reveal>
        </section>

        {/* Treatments */}
        <section id="treatments" className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-36">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className={`${serif} text-5xl md:text-7xl`}>Signature treatments</h2>
              <p className="hidden text-sm uppercase tracking-[0.2em] opacity-60 md:block">Hover to preview</p>
            </div>
          </Reveal>
          <TreatmentList />
        </section>

        {/* Booking */}
        <section id="book" className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-36">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: C.clay }}>
              Book online
            </p>
            <h2 className={`${serif} mb-10 mt-3 text-5xl md:text-7xl`}>
              Find your <em>hour</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingWidget onRequest={book} />
          </Reveal>
        </section>

        {/* Ritual */}
        <section id="ritual" className="grid md:grid-cols-2" style={{ background: C.deep, color: C.linen }}>
          <div className="relative min-h-[60vh] overflow-hidden">
            <img src={`${IMG}/citrus.jpg`} alt="Citrus slices floating in a bath" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-5 py-20 md:px-16 md:py-28">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#F2C48D' }}>
                The Halia ritual
              </p>
              <h2 className={`${serif} mt-3 text-5xl md:text-6xl`}>Three hours, three movements.</h2>
            </Reveal>
            <ol className="mt-12 space-y-10">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.12}>
                  <li className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className={`${serif} text-3xl italic`} style={{ color: '#F2C48D' }}>
                      {s.n}
                    </span>
                    <div>
                      <h3 className={`${serif} text-3xl`}>{s.title}</h3>
                      <p className="mt-2 max-w-sm opacity-70">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Shop */}
        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <h2 className={`${serif} text-5xl md:text-7xl`}>
              Take the ritual <em>home</em>.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <button type="button" onClick={demo('On a live site, this adds the product to the spa’s online shop cart.')} className="group block w-full text-left">
                  <div className="aspect-[4/5] overflow-hidden rounded-t-[999px]" style={{ background: C.linen }}>
                    <img src={`${IMG}/${p.img}.jpg`} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <h3 className={`${serif} text-2xl`}>{p.name}</h3>
                      <p className="text-sm opacity-60">{p.size}</p>
                    </div>
                    <p className={`${serif} text-xl`} style={{ color: C.clay }}>
                      RM {p.price}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section className="px-5 pb-24 md:pb-36">
          <Quotes />
        </section>

        {/* Membership */}
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-16 md:py-20" style={{ background: C.clay, color: C.linen }}>
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20" style={{ background: '#F2C48D' }} />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] opacity-70">Membership</p>
                  <h2 className={`${serif} mt-3 text-5xl md:text-6xl`}>The Halia Circle</h2>
                  <p className="mt-4 max-w-md opacity-80">One 60-minute treatment every month, 15% off everything else, and first pick of weekend slots.</p>
                </div>
                <button type="button" onClick={demo('On a live site, this opens the membership sign-up.')} className="shrink-0 rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em]" style={{ background: C.linen, color: C.clay }}>
                  RM 380 / month →
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer id="visit" style={{ background: C.deep, color: C.linen }}>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-16 md:grid-cols-4 md:px-10">
            <div className="md:col-span-2">
              <p className={`${serif} text-4xl tracking-[0.18em]`}>HALIA HOUSE</p>
              <p className="mt-4 max-w-xs opacity-60">Spa &amp; skin studio · Damansara Heights, Kuala Lumpur</p>
            </div>
            <div className="text-sm">
              <p className="mb-3 uppercase tracking-[0.2em] opacity-50">Hours</p>
              <p>Daily, 10am – 9pm</p>
              <p className="opacity-60">Last booking 7:30pm</p>
            </div>
            <div className="text-sm">
              <p className="mb-3 uppercase tracking-[0.2em] opacity-50">Say hello</p>
              <button type="button" onClick={book} className="block hover:opacity-60">
                WhatsApp
              </button>
              <button type="button" onClick={demo('On a live site, this opens the spa’s Instagram.')} className="block hover:opacity-60">
                Instagram
              </button>
            </div>
          </div>
        </footer>
      </div>
      {toast}
    </ConceptShell>
  )
}
