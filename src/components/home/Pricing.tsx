import type { PointerEvent } from 'react'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import Button, { Arrow } from '../Button'
import { LogoMark } from '../Logo'
import { whatsappLink } from '../../data/site'

type Package = {
  name: string
  price: string
  from?: boolean
  unit?: string
  timeline: string
  blurb: string
  items: string[]
  popular?: boolean
}

const websites: Package[] = [
  {
    name: 'Landing Page',
    price: '1,500',
    timeline: '~1 week',
    blurb: 'One focused page that turns visitors into WhatsApp enquiries.',
    items: ['Single-page, mobile-first design', 'WhatsApp & enquiry buttons', 'Google Maps & basic SEO', 'Copywriting included'],
  },
  {
    name: 'Business Website',
    price: '3,800',
    from: true,
    timeline: '3–4 weeks',
    blurb: 'A complete 5–8 page site that builds trust and ranks on Google.',
    items: ['Everything in Landing Page', 'Up to 8 pages', 'SEO setup & Google Business link', 'Menu, services or portfolio pages', 'Easy to update yourself'],
    popular: true,
  },
  {
    name: 'E-commerce',
    price: '6,500',
    from: true,
    timeline: '6–8 weeks',
    blurb: 'An online store your customers can browse and pay on directly.',
    items: ['FPX & card payments', 'Product & stock management', 'Delivery & shipping setup', 'Order management walkthrough'],
  },
]

const addOns = [
  {
    tag: 'Automation',
    name: 'AI Automation',
    price: 'from RM 1,200',
    unit: 'per workflow',
    items: ['Booking & appointment reminders', 'Invoice follow-ups', 'Auto-replies for email & chat'],
    ask: "Hi UPWRD! I'm interested in AI automation for my business.",
  },
  {
    tag: 'Design',
    name: 'Social Media Design',
    price: 'RM 800',
    unit: 'per month · 8 posts',
    items: ['On-brand posts, ready to publish', 'Single designs from RM 150', 'Posters, menus & packaging on request'],
    ask: "Hi UPWRD! I'm interested in monthly social media design.",
  },
  {
    tag: 'Care',
    name: 'Care Plan',
    price: 'RM 150',
    unit: 'per month',
    items: ['Hosting, SSL & daily backups', 'Security & plugin updates', 'Small edits each month', 'Care Plus with priority edits: RM 300/mo'],
    ask: "Hi UPWRD! I'd like to know more about the Care Plan.",
  },
]

const terms = ['50% to start, 50% on completion', '3 rounds of revisions included', 'You own your website & domain']

// The card tracks the pointer in CSS variables so a soft spotlight can
// follow it across the surface.
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Check({ className = 'text-accent' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${className}`} aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function WebsiteCard({ p, i }: { p: Package; i: number }) {
  const dark = p.popular
  return (
    <Reveal delay={i * 0.1} className="h-full">
      <article
        onPointerMove={trackPointer}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 md:p-8 ${
          dark ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white hover:border-ink/20'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(380px circle at var(--mx) var(--my), ${dark ? 'rgba(142,176,255,0.14)' : 'rgba(43,91,255,0.09)'}, transparent 60%)`,
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <h3 className="text-xl font-medium tracking-[-0.03em]">{p.name}</h3>
          {p.popular ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">Most popular</span>
          ) : (
            <span className="font-mono text-[11px] text-ink/45">{p.timeline}</span>
          )}
        </div>
        <p className={`relative mt-2 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-ink/65'}`}>{p.blurb}</p>
        <p className="relative mt-8 flex items-baseline gap-2">
          <span className={`text-sm ${dark ? 'text-white/60' : 'text-ink/60'}`}>{p.from ? 'from RM' : 'RM'}</span>
          <span className="text-6xl font-medium tracking-tightest">{p.price}</span>
        </p>
        {p.popular && <p className="relative mt-1 font-mono text-[11px] text-white/50">{p.timeline}</p>}
        <ul className={`relative mt-8 flex-1 space-y-2.5 border-t pt-6 text-sm ${dark ? 'border-white/10' : 'border-ink/10'}`}>
          {p.items.map((it) => (
            <li key={it} className="flex gap-3">
              <Check className={dark ? 'text-accent-soft' : 'text-accent'} />
              {it}
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink(`Hi UPWRD! I'm interested in the ${p.name} package.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/cta relative mt-8 flex items-center justify-between rounded-full py-2 pl-5 pr-2 text-sm font-medium transition-colors ${
            dark ? 'bg-accent text-white hover:bg-accent-deep' : 'bg-ink/[0.05] text-ink hover:bg-ink/10'
          }`}
        >
          Ask about this
          <span className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover/cta:rotate-45 ${dark ? 'bg-white text-accent' : 'bg-ink text-paper'}`}>
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </a>
      </article>
    </Reveal>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-paper pb-20 pt-28 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="05"
          label="Pricing"
          lines={['Clear prices,', 'no surprises.']}
          aside={
            <p className="max-w-xs text-[15px] leading-relaxed text-ink/65">
              Fixed quotes agreed before we start. Bigger or unusual projects are scoped with you on a quick call.
            </p>
          }
        />

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60 md:mt-24">Websites</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {websites.map((p, i) => (
            <WebsiteCard key={p.name} p={p} i={i} />
          ))}
        </div>

        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">Automation, design &amp; care</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {addOns.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.08} className="h-full">
              <a
                href={whatsappLink(a.ask)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white/60 p-6 transition-colors duration-500 hover:border-ink/25 hover:bg-white md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/65">{a.tag}</span>
                  <Arrow className="h-4 w-4 text-ink/40 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-accent" />
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-[-0.03em]">{a.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-medium tracking-tightest">{a.price}</span>{' '}
                  <span className="text-sm text-ink/60">{a.unit}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-ink/80">
                  {a.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/65">
            {terms.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="signature-border relative mt-14 overflow-hidden rounded-3xl p-px">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-ink p-8 text-paper md:p-14">
              <LogoMark className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 text-white/[0.04] md:-bottom-24 md:h-[28rem] md:w-[28rem]" blockClassName="text-accent/20" />
              <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">Signature bundle</p>
                  <h3 className="mt-5 text-5xl font-medium leading-[0.92] tracking-tightest md:text-7xl">
                    Digital{' '}
                    <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">Foundation</span>
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                    A Business Website, one automation and three months of social media design — planned and built as one
                    system from day one.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {['Business Website', '1 AI automation', '3 months · 8 posts/mo'].map((x) => (
                      <li key={x} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-5 md:items-end">
                  <div className="md:text-right">
                    <p className="text-sm text-white/50 line-through">RM 7,400 separately</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm text-white/60">RM</span>
                      <span className="text-6xl font-medium tracking-tightest">5,900</span>
                    </p>
                    <p className="mt-1 text-sm text-accent-soft">Save RM 1,500</p>
                  </div>
                  <Button to={whatsappLink("Hi UPWRD! I'm interested in the Digital Foundation bundle.")} variant="accent">
                    Ask on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
