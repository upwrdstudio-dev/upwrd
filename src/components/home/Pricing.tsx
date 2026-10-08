import type { PointerEvent } from 'react'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import Button from '../Button'
import { LogoMark } from '../Logo'

const tiers = [
  {
    tag: 'Web',
    label: 'Website Development',
    from: '800',
    note: 'Landing pages from RM 800. Full 5–8 page business sites up to RM 4,500.',
    items: ['Responsive design', 'SEO foundations', 'WhatsApp & form enquiries', 'Maintenance plans'],
  },
  {
    tag: 'Auto',
    label: 'AI Automation',
    from: '800',
    note: 'Scoped per workflow — most pay for themselves within a few months.',
    items: ['Reminders & follow-ups', 'Invoice automation', 'Email & chat replies', 'Custom multi-step flows'],
  },
  {
    tag: 'Design',
    label: 'Design',
    from: '80',
    note: 'Single pieces from RM 80, or monthly support for a steady stream of content.',
    items: ['Social media posts', 'Posters & flyers', 'Packaging & menus', 'Brand asset kits'],
  },
]

// The card tracks the pointer in CSS variables so a soft spotlight can
// follow it across the surface.
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-paper pb-20 pt-28 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="05"
          label="Pricing"
          lines={['Priced on outcome,', 'not hours.']}
          aside={
            <p className="max-w-xs text-[15px] leading-relaxed text-ink/65">
              Every quote is scoped to your business, not a fixed package. These are starting points.
            </p>
          }
        />

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.tag} delay={i * 0.1} className="h-full">
              <article
                onPointerMove={trackPointer}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-ink/20 md:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(43,91,255,0.09), transparent 60%)',
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/65">
                    {t.tag}
                  </span>
                  <span className="font-mono text-[11px] text-ink/45">0{i + 1}</span>
                </div>
                <h3 className="relative mt-10 text-2xl font-medium tracking-[-0.03em]">{t.label}</h3>
                <p className="relative mt-4 flex items-baseline gap-2">
                  <span className="text-sm text-ink/60">from RM</span>
                  <span className="text-6xl font-medium tracking-tightest">{t.from}</span>
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-ink/65">{t.note}</p>
                <ul className="relative mt-8 space-y-2.5 border-t border-ink/10 pt-6 text-sm">
                  {t.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true">
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="signature-border relative mt-4 overflow-hidden rounded-3xl p-px">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-ink p-8 text-paper md:p-14">
              <LogoMark className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 text-white/[0.04] md:-bottom-24 md:h-[28rem] md:w-[28rem]" blockClassName="text-accent/20" />
              <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Signature offer</p>
                  <h3 className="mt-5 text-5xl font-medium leading-[0.92] tracking-tightest md:text-7xl">
                    Digital{' '}
                    <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">Foundation</span>
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                    A website, one automation and three months of design support — bundled and built as one system from
                    day one.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {['Website', '1 automation', '3 months design'].map((x) => (
                      <li key={x} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button to="/#contact" variant="accent" className="shrink-0">
                  Get a quote
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
