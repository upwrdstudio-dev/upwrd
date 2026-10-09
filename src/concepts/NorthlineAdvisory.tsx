import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import ConceptShell from './ConceptShell'
import { useDemoAction } from './useDemoAction'
import Reveal from '../components/Reveal'
import { EASE_OUT } from '../lib/motion'

const IMG = '/images/concepts/northline'
const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap'

// Palette: forest, paper, brass.
const C = {
  forest: '#12332B',
  deep: '#0B211C',
  paper: '#F4F2EC',
  mist: '#DFE6E1',
  brass: '#B8925A',
  ink: '#16201D',
}

const accent = "font-['Newsreader'] italic font-normal"

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const services: { title: string; body: string; icon: ReactNode }[] = [
  { title: 'Accounting & bookkeeping', body: 'Monthly books closed on time, with management accounts you can actually read.', icon: icon('M4 19V5m0 14h16M8 15l3-4 3 2 5-6') },
  { title: 'Tax compliance & planning', body: 'Corporate and personal tax filed correctly — and structured to keep more of what you earn.', icon: icon('M7 3h10v18l-5-3-5 3V3Zm3 6h4m-4 4h4') },
  { title: 'Company secretarial', body: 'SSM filings, resolutions and annual returns handled before the deadline reminder.', icon: icon('M5 4h14v16H5zM9 8h6M9 12h6M9 16h3') },
  { title: 'Payroll & statutory', body: 'Payroll, EPF, SOCSO, EIS and PCB processed accurately every month.', icon: icon('M3 7h18v10H3zM7 12h.01M17 12h.01M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z') },
  { title: 'e-Invoicing readiness', body: 'We map your invoicing to LHDN MyInvois requirements and get your systems compliant.', icon: icon('M4 4h10l6 6v10H4zM14 4v6h6M8 14l2 2 4-4') },
  { title: 'Fractional CFO', body: 'Cash-flow forecasts, budgeting and funding support — senior finance without the full-time hire.', icon: icon('M12 3v18M17 7.5C17 5.6 14.8 4.5 12 4.5S7 5.6 7 7.5s2.2 3 5 3.5 5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3') },
]

const steps = [
  { n: '01', title: 'Free health check', body: 'A 30-minute call to review your books, filings and deadlines.' },
  { n: '02', title: 'Clear proposal', body: 'A fixed monthly fee and a written scope. No surprise invoices.' },
  { n: '03', title: 'Smooth handover', body: 'We take over from your previous firm and clean up the backlog.' },
  { n: '04', title: 'Monthly rhythm', body: 'Books closed by the 10th, with a short call to walk you through them.' },
]

const plans = [
  { name: 'Starter', price: '350', for: 'Sole props & new Sdn Bhds', items: ['Bookkeeping up to 80 transactions', 'Annual tax filing', 'Company secretarial'] },
  { name: 'Growth', price: '850', for: 'Growing SMEs', items: ['Unlimited bookkeeping', 'Monthly management accounts', 'Payroll up to 25 staff', 'Quarterly tax planning call'], featured: true },
  { name: 'Scale', price: null, for: 'Multi-entity groups', items: ['Fractional CFO', 'Consolidated reporting', 'Audit coordination', 'Dedicated partner'] },
]

const faqs = [
  { q: 'Can you take over mid-year from our current accountant?', a: 'Yes. Most clients switch mid-year. We request the records, reconcile what’s there and fix gaps before the next filing deadline.' },
  { q: 'Do you help with LHDN e-invoicing?', a: 'We assess whether and when you need to comply, recommend a MyInvois-ready setup, and help your team issue e-invoices correctly.' },
  { q: 'Are your fees really fixed?', a: 'Yes. Your monthly fee covers the agreed scope. If your business grows past it, we’ll talk about it before anything changes.' },
  { q: 'Will we have a dedicated contact?', a: 'Every client has a named account manager, with a partner reviewing your accounts each quarter.' },
]

// Malaysian corporate tax for qualifying SMEs (YA2023 onwards): 15% on the
// first RM150k, 17% on the next RM450k, 24% on the remainder.
function smeTax(income: number) {
  const b1 = Math.min(income, 150_000) * 0.15
  const b2 = Math.min(Math.max(income - 150_000, 0), 450_000) * 0.17
  const b3 = Math.max(income - 600_000, 0) * 0.24
  return { b1, b2, b3, total: b1 + b2 + b3 }
}

const rm = (n: number) => `RM ${Math.round(n).toLocaleString('en-MY')}`

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => rm(v))
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: EASE_OUT })
    return () => c.stop()
  }, [mv, value])
  return <motion.span>{text}</motion.span>
}

function TaxEstimator() {
  const [income, setIncome] = useState(480_000)
  const t = smeTax(income)
  const flat = income * 0.24
  const saving = flat - t.total
  const max = Math.max(flat, 1)
  const pct = (income / 2_000_000) * 100

  return (
    <div className="grid gap-px overflow-hidden rounded-3xl md:grid-cols-[1.2fr_1fr]" style={{ background: `${C.paper}22` }}>
      <div className="p-6 md:p-10" style={{ background: C.forest }}>
        <label htmlFor="income" className="text-sm opacity-70">
          Chargeable income for the year
        </label>
        <p className="mt-2 text-5xl font-medium tracking-[-0.03em] md:text-6xl">
          <AnimatedNumber value={income} />
        </p>
        <input
          id="income"
          type="range"
          min={0}
          max={2_000_000}
          step={10_000}
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="northline-range mt-8 w-full"
          style={{ background: `linear-gradient(to right, ${C.brass} ${pct}%, ${C.paper}26 ${pct}%)` }}
        />
        <div className="mt-2 flex justify-between text-xs opacity-50">
          <span>RM 0</span>
          <span>RM 2m</span>
        </div>

        <div className="mt-10 space-y-4 text-sm">
          {[
            { label: '15% on first RM150k', v: t.b1 },
            { label: '17% on next RM450k', v: t.b2 },
            { label: '24% above RM600k', v: t.b3 },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between opacity-80">
                <span>{b.label}</span>
                <AnimatedNumber value={b.v} />
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: `${C.paper}1a` }}>
                <motion.div className="h-full rounded-full" style={{ background: C.brass }} animate={{ width: `${(b.v / max) * 100}%` }} transition={{ duration: 0.6, ease: EASE_OUT }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 md:p-10" style={{ background: C.deep }}>
        <div>
          <p className="text-sm opacity-70">Estimated SME tax</p>
          <p className="mt-2 text-5xl font-medium tracking-[-0.03em]" style={{ color: C.brass }}>
            <AnimatedNumber value={t.total} />
          </p>
          <p className="mt-6 text-sm opacity-70">At the standard 24% rate</p>
          <p className="mt-1 text-2xl line-through opacity-50">
            <AnimatedNumber value={flat} />
          </p>
          <div className="mt-8 rounded-2xl p-5" style={{ background: `${C.brass}22` }}>
            <p className="text-sm opacity-80">Qualifying as an SME could save you</p>
            <p className="mt-1 text-3xl font-medium">
              <AnimatedNumber value={saving} />
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed opacity-50">
          Illustrative only. SME rates apply to Malaysian-resident companies with paid-up capital of RM2.5m or less and gross
          income of RM50m or less, subject to conditions.
        </p>
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y border-y" style={{ borderColor: `${C.ink}1a` }}>
      {faqs.map((f, i) => (
        <div key={f.q} style={{ borderColor: `${C.ink}1a` }}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl">
            {f.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl" style={{ background: open === i ? C.forest : C.mist, color: open === i ? C.paper : C.ink }}>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="max-w-2xl overflow-hidden pb-6 opacity-70">
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M12 2 19 21 12 16.5 5 21Z" fill="currentColor" />
    </svg>
  )
}

export default function NorthlineAdvisory() {
  const { demo, toast } = useDemoAction('bg-[#12332B] text-[#F4F2EC]')
  const consult = demo('On a live site, this opens the firm’s booking calendar for a free 30-minute consultation.')

  return (
    <ConceptShell
      title="Northline Advisory"
      description="Accounting, tax and company secretarial for Malaysian SMEs. Concept website by UPWRD Studio."
      fontsHref={FONTS}
      themeColor={C.forest}
    >
      <div className="min-h-screen font-['Inter_Tight'] antialiased" style={{ background: C.paper, color: C.ink }}>
        <div className="py-2 text-center text-[13px]" style={{ background: C.deep, color: C.paper }}>
          Need help with LHDN e-invoicing? <button type="button" onClick={consult} className="underline underline-offset-4" style={{ color: C.brass }}>Book a free readiness check</button>
        </div>

        <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: `${C.paper}e6`, borderColor: `${C.ink}12` }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
            <span className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]" style={{ color: C.forest }}>
              <Mark /> Northline
            </span>
            <nav className="hidden gap-8 text-[15px] md:flex">
              {['Services', 'Tax estimator', 'Pricing', 'FAQ'].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="opacity-70 transition-opacity hover:opacity-100">
                  {l}
                </a>
              ))}
            </nav>
            <button type="button" onClick={consult} className="rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90" style={{ background: C.forest, color: C.paper }}>
              Book a consultation
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-sm font-medium" style={{ color: C.brass }}>
              Accounting · Tax · Company secretarial
            </motion.p>
            <h1 className="mt-5 text-[13vw] font-medium leading-[0.95] tracking-[-0.045em] md:text-[5.6rem]">
              {[
                <>Numbers you</>,
                <>
                  can <span className={accent} style={{ color: C.forest }}>build</span> on.
                </>,
              ].map((line, i) => (
                <span key={i} className="-mx-[0.08em] -mb-[0.3em] block overflow-hidden px-[0.08em] pb-[0.3em]">
                  <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: EASE_OUT }}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }} className="mt-7 max-w-md text-lg leading-relaxed opacity-70">
              We keep Malaysian SMEs compliant, organised and tax-efficient — so you can make decisions with confidence,
              not guesswork.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: EASE_OUT }} className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={consult} className="rounded-full px-7 py-4 font-medium" style={{ background: C.forest, color: C.paper }}>
                Get a free health check
              </button>
              <a href="#tax-estimator" className="rounded-full border px-7 py-4 font-medium transition-colors hover:bg-black/5" style={{ borderColor: `${C.ink}26` }}>
                Estimate your tax
              </a>
            </motion.div>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-12 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: `${C.ink}14` }}>
              {[
                ['300+', 'SME clients'],
                ['12 yrs', 'in practice'],
                ['0', 'missed deadlines'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-3xl font-medium tracking-[-0.03em]" style={{ color: C.forest }}>
                    {n}
                  </dt>
                  <dd className="mt-1 text-sm opacity-60">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img src={`${IMG}/lounge.jpg`} alt="Advisors meeting with a client" className="h-full w-full object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
              className="absolute -left-4 bottom-10 w-60 rounded-2xl p-5 shadow-2xl md:-left-10"
              style={{ background: C.paper }}
            >
              <p className="text-xs opacity-60">Books closed for September</p>
              <p className="mt-1 text-2xl font-medium">On time ✓</p>
              <div className="mt-4 flex h-12 items-end gap-1.5">
                {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
                  <motion.span key={i} className="flex-1 rounded-sm" style={{ background: i === 6 ? C.brass : C.mist }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: 1.1 + i * 0.06, ease: EASE_OUT }} />
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: EASE_OUT }}
              className="absolute -right-2 top-8 rounded-2xl px-4 py-3 text-sm shadow-xl md:-right-6"
              style={{ background: C.forest, color: C.paper }}
            >
              e-Invoice ready <span style={{ color: C.brass }}>●</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
              Everything finance, under <span className={accent} style={{ color: C.forest }}>one roof</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border md:grid-cols-3" style={{ background: `${C.ink}14`, borderColor: `${C.ink}14` }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden p-8 transition-colors duration-500 hover:text-[#F4F2EC]" style={{ background: C.paper }}>
                  <span className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100" style={{ background: C.forest }} />
                  <div className="relative">
                    <span className="transition-colors duration-500 group-hover:text-[#B8925A]" style={{ color: C.forest }}>
                      {s.icon}
                    </span>
                    <h3 className="mt-10 text-xl font-medium">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed opacity-70">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tax estimator */}
        <section id="tax-estimator" style={{ background: C.deep, color: C.paper }}>
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
            <Reveal>
              <p className="text-sm font-medium" style={{ color: C.brass }}>
                SME tax estimator
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
                See what the <span className={accent} style={{ color: C.brass }}>SME rate</span> is worth to you.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <TaxEstimator />
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="text-4xl font-medium tracking-[-0.035em] md:text-6xl">
              Switching is <span className={accent} style={{ color: C.forest }}>painless</span>.
            </h2>
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <motion.span
              className="absolute left-0 right-0 top-5 hidden h-px origin-left md:block"
              style={{ background: C.brass }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: EASE_OUT }}
            />
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.2 + i * 0.15}>
                <span className="relative grid h-10 w-10 place-items-center rounded-full text-sm font-medium" style={{ background: C.forest, color: C.paper }}>
                  {s.n}
                </span>
                <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed opacity-70">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Quote band */}
        <section className="relative overflow-hidden" style={{ color: C.paper }}>
          <img src={`${IMG}/towers.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${C.deep}f2 30%, ${C.deep}80)` }} />
          <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
            <Reveal>
              <p className={`${accent} max-w-3xl text-3xl leading-snug md:text-5xl`}>
                “Good accounting isn’t about looking back at last year. It’s about knowing, every month, exactly where your
                business stands.”
              </p>
              <p className="mt-8 text-sm opacity-70">Managing Partner, Northline Advisory</p>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="text-4xl font-medium tracking-[-0.035em] md:text-6xl">
              Fixed fees. <span className={accent} style={{ color: C.forest }}>No surprises.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col rounded-3xl border p-8"
                  style={p.featured ? { background: C.forest, color: C.paper, borderColor: C.forest } : { borderColor: `${C.ink}1a`, background: '#fff' }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">{p.name}</h3>
                    {p.featured && (
                      <span className="rounded-full px-3 py-1 text-xs" style={{ background: C.brass, color: C.deep }}>
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm opacity-60">{p.for}</p>
                  <p className="mt-8 text-5xl font-medium tracking-[-0.04em]">
                    {p.price ? (
                      <>
                        <span className="mr-1 text-xl opacity-60">RM</span>
                        {p.price}
                        <span className="text-base font-normal opacity-60">/mo</span>
                      </>
                    ) : (
                      <span className={accent}>Let’s talk</span>
                    )}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span style={{ color: p.featured ? C.brass : C.forest }}>✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={consult} className="mt-8 rounded-full py-3.5 text-sm font-medium" style={p.featured ? { background: C.paper, color: C.forest } : { background: C.forest, color: C.paper }}>
                    Get started
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ + contact */}
        <section id="faq" className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 md:grid-cols-2 md:px-10 md:pb-32">
          <div>
            <Reveal>
              <h2 className="mb-10 text-4xl font-medium tracking-[-0.035em] md:text-5xl">Questions</h2>
            </Reveal>
            <Faq />
          </div>
          <Reveal delay={0.1}>
            <form
              onSubmit={demo('On a live site, this sends the enquiry straight to the firm’s inbox and CRM.')}
              className="rounded-3xl p-8 md:p-10"
              style={{ background: C.mist }}
            >
              <h3 className="text-2xl font-medium">Talk to an advisor</h3>
              <p className="mt-2 text-sm opacity-70">We reply within one working day.</p>
              <div className="mt-8 space-y-4">
                {['Your name', 'Company', 'Email'].map((ph) => (
                  <input key={ph} placeholder={ph} aria-label={ph} className="w-full rounded-xl border bg-white px-4 py-3.5 outline-none transition-shadow focus:ring-2" style={{ borderColor: `${C.ink}14` }} />
                ))}
                <select aria-label="Service" className="w-full rounded-xl border bg-white px-4 py-3.5 outline-none" style={{ borderColor: `${C.ink}14` }} defaultValue="">
                  <option value="" disabled>
                    What do you need help with?
                  </option>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
                <button type="submit" className="w-full rounded-full py-4 font-medium" style={{ background: C.forest, color: C.paper }}>
                  Send enquiry
                </button>
              </div>
            </form>
          </Reveal>
        </section>

        <footer style={{ background: C.deep, color: C.paper }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 pb-24 pt-12 text-sm md:flex-row md:items-center md:justify-between md:px-10 md:pb-20">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <span style={{ color: C.brass }}>
                <Mark />
              </span>
              Northline Advisory
            </span>
            <p className="opacity-60">Accounting · Tax · Company secretarial — Kuala Lumpur</p>
          </div>
        </footer>
      </div>
      {toast}
    </ConceptShell>
  )
}
