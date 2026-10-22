import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SEO from '../components/SEO'
import TextReveal from '../components/TextReveal'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import { Eyebrow } from '../components/SectionHeading'
import { Arrow } from '../components/Button'
import NotFoundPage from './NotFoundPage'
import { servicePages, type ServicePage as Page } from '../data/servicePages'
import { guideMeta } from '../data/guideMeta'
import { projects } from '../data/projects'
import { concepts } from '../data/concepts'
import { SITE_URL, whatsappLink } from '../data/site'
import { EASE_OUT } from '../lib/motion'

const allWork = [...projects, ...concepts]

const steps = [
  { n: '01', title: 'Free check', body: 'Tell us about your business on WhatsApp. We look at what you have and suggest what would help most.' },
  { n: '02', title: 'Fixed quote', body: 'A clear scope and price before anything starts. 50% to begin, 50% on completion.' },
  { n: '03', title: 'Build & launch', body: 'We design, build and refine with you — three rounds of revisions included.' },
]

function Faq({ faqs }: { faqs: Page['faqs'] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="border-t border-ink/10">
      {faqs.map((f, i) => (
        <div key={f.q} className="border-b border-ink/10">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <h3 className="text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-accent md:text-xl">{f.q}</h3>
            <span
              className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                open === i ? 'border-accent bg-accent text-white' : 'border-ink/15'
              }`}
            >
              <span className="absolute h-[1.5px] w-3 bg-current" />
              <motion.span className="absolute h-3 w-[1.5px] bg-current" animate={{ rotate: open === i ? 90 : 0, opacity: open === i ? 0 : 1 }} />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="max-w-2xl overflow-hidden pb-6 text-[15px] leading-relaxed text-ink/65"
              >
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function jsonLd(page: Page) {
  const url = `${SITE_URL}/services/${page.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: page.label,
        description: page.intro,
        url,
        areaServed: [
          { '@type': 'City', name: 'Kuala Lumpur' },
          { '@type': 'State', name: 'Selangor' },
          { '@type': 'Country', name: 'Malaysia' },
        ],
        provider: { '@type': 'ProfessionalService', name: 'UPWRD Studio', url: SITE_URL },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: page.label, item: url },
        ],
      },
    ],
  }
}

export default function ServicePage() {
  const { slug } = useParams()
  const page = servicePages.find((p) => p.slug === slug)
  if (!page) return <NotFoundPage />

  const work = page.work.map((name) => allWork.find((w) => w.name === name)).filter((w) => w !== undefined)
  const others = servicePages.filter((p) => p.slug !== page.slug)
  const related = (page.guides ?? []).map((slug) => guideMeta.find((g) => g.slug === slug)).filter((g) => g !== undefined)

  return (
    <div className="bg-paper">
      <SEO path={`/services/${page.slug}`} jsonLd={jsonLd(page)} />

      {/* Hero */}
      <header className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <Reveal y={12}>
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            <Link to="/" className="hover:text-ink">
              Home
            </Link>{' '}
            / <span className="text-ink/70">{page.label}</span>
          </nav>
          <Eyebrow label={page.eyebrow} />
        </Reveal>
        <TextReveal
          as="h1"
          lines={[page.heading, <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">{page.headingAccent}</span>]}
          className="mt-6 text-[11vw] font-medium leading-[0.95] tracking-tightest md:text-7xl lg:text-[5.5rem]"
        />
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-8 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">{page.intro}</p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button to={whatsappLink(page.whatsapp)} variant="accent">
                Chat on WhatsApp
              </Button>
              <Button to="/#enquire" variant="outline-dark">
                Free website check
              </Button>
            </div>
          </div>
        </Reveal>
      </header>

      {/* Includes */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tightest md:text-5xl">{page.includesTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {page.includes.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="h-full bg-paper p-6 transition-colors duration-500 hover:bg-white md:p-8">
                <span className="block h-2 w-2 bg-accent" />
                <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Page-specific detail */}
      {page.details && (
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
          <div className="grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-12 md:pt-16">
            <Reveal className="md:col-span-5">
              <h2 className="text-3xl font-medium tracking-tightest md:text-5xl">{page.details.heading}</h2>
            </Reveal>
            <div className="space-y-5 md:col-span-7">
              {page.details.body.map((p) => (
                <Reveal key={p}>
                  <p className="text-[17px] leading-[1.75] text-ink/75">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relevant work */}
      {work.length > 0 && (
        <section data-nav="dark" className="bg-ink text-paper">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
            <Reveal>
              <Eyebrow label="Relevant work" tone="dark" />
              <h2 className="mt-5 text-3xl font-medium tracking-tightest md:text-5xl">See it in action</h2>
            </Reveal>
            <div className={`mt-12 grid gap-16 md:gap-6 ${work.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl'}`}>
              {work.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <ProjectCard project={p} index={i} frameClassName="aspect-[4/3]" />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <Link to="/work" className="mt-12 inline-block text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                See all our work →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Process + price */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="text-3xl font-medium tracking-tightest md:text-5xl">How it works</h2>
          </Reveal>
          <ol className="mt-10 space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 pt-6">
                  <span className="font-mono text-xs text-ink/50">({s.n})</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/65">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="rounded-3xl bg-ink p-8 text-paper md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">{page.price.label}</p>
            <p className="mt-4 text-5xl font-medium tracking-tightest">{page.price.value}</p>
            <p className="mt-3 text-sm text-white/60">{page.price.note}</p>
            <ul className="mt-8 space-y-2 border-t border-white/10 pt-6 text-sm text-white/75">
              <li>50% to start, 50% on completion</li>
              <li>3 rounds of revisions included</li>
              <li>You own your website &amp; domain</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={whatsappLink(page.whatsapp)} variant="accent">
                Get a quote
              </Button>
              <Link to="/#pricing" className="self-center text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                All pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <h2 className="mb-8 text-3xl font-medium tracking-tightest md:text-5xl">Questions</h2>
        </Reveal>
        <Faq faqs={page.faqs} />
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
          <Reveal>
            <h2 className="text-3xl font-medium tracking-tightest md:text-5xl">Helpful guides</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((g, i) => (
              <Reveal key={g.slug} delay={i * 0.06} className="h-full">
                <Link
                  to={`/guides/${g.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-colors duration-500 hover:border-ink/25 md:p-7"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">{g.readMins} min read</span>
                  <h3 className="mt-4 text-xl font-medium leading-snug tracking-[-0.02em]">{g.title}</h3>
                  <span className="mt-6 flex items-center gap-2 text-sm font-medium">
                    Read guide
                    <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Also from UPWRD</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to={`/services/${o.slug}`}
                  className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {o.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
