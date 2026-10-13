import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import TextReveal from '../components/TextReveal'
import Button from '../components/Button'
import { Eyebrow } from '../components/SectionHeading'
import { CONTACT, SITE_URL, whatsappLink } from '../data/site'

// Facts here also appear in llms.txt and the home page structured data —
// keep them in sync.
const facts = [
  ['Based in', 'Kuala Lumpur, Malaysia'],
  ['Building websites since', '2025'],
  ['Languages', 'English · Bahasa Malaysia · Mandarin · Cantonese'],
  ['Serving', 'Kuala Lumpur, Selangor & businesses across Malaysia'],
]

const principles = [
  {
    title: 'You work with the maker',
    body: 'UPWRD is founder-led. The person you talk to is the person who designs and builds your website — no account managers, no messages lost in between.',
  },
  {
    title: 'Clear, fixed prices',
    body: 'You get a fixed quote before anything starts: 50% to begin, 50% on completion, three rounds of revisions included.',
  },
  {
    title: 'Built to be found',
    body: 'Every site is fast, mobile-first and set up for Google from day one — because a beautiful website nobody finds doesn’t help your business.',
  },
  {
    title: 'You own everything',
    body: 'Your domain is registered in your name and the website is fully yours once paid. No lock-in, ever.',
  },
]

const howWeBuild = [
  {
    title: 'WordPress',
    body: 'For most business websites — easy for you to update yourself, and you can move it to any host or developer, any time.',
  },
  {
    title: 'Custom code',
    body: 'For landing pages and showcase sites where design and speed matter most — like this website and our concept sites.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_URL}/about`,
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'UPWRD Studio',
    url: SITE_URL,
    foundingDate: '2025',
    knowsLanguage: ['en', 'ms', 'zh', 'yue'],
    address: { '@type': 'PostalAddress', addressLocality: 'Kuala Lumpur', addressCountry: 'MY' },
    email: CONTACT.email,
    telephone: `+${CONTACT.whatsapp}`,
    sameAs: [CONTACT.instagramUrl, CONTACT.googleProfileUrl],
  },
}

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <SEO path="/about" jsonLd={jsonLd} />

      <PageHeader eyebrow="About UPWRD" title="About" count="Est. 2025">
        <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
          UPWRD Studio is a founder-led web design studio in Kuala Lumpur. We design and build websites — and the
          brand and social media design around them — for small businesses that want to look professional, get found online and
          win more customers.
        </p>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-12 md:px-8 md:pb-32">
        <div className="md:col-span-5">
          <Reveal y={12}>
            <Eyebrow label="The story" />
          </Reveal>
          <TextReveal
            lines={['Small studio,', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">big care.</span>]}
            className="mt-5 text-5xl font-medium leading-[0.95] tracking-tightest md:text-6xl"
          />
        </div>
        <Reveal delay={0.1} className="space-y-5 text-[17px] leading-[1.75] text-ink/75 md:col-span-7">
          <p>
            UPWRD started in 2025 with a simple observation: most small businesses in Malaysia either don’t have a website,
            or have one that’s slow, outdated and hard to change. Meanwhile, their customers are searching for them on
            Google, Maps and Instagram every day.
          </p>
          <p>
            So we keep things simple. A clear fixed price, a website that looks great on a phone, works fast, and is set up
            to be found — and a direct line to the person actually building it.
          </p>
          <p>
            We work in English, Bahasa Malaysia, Mandarin and Cantonese, so we can talk with you — and write for your
            customers — in the languages your business uses.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-ink/10 bg-white/50">
        <dl className="mx-auto grid max-w-7xl gap-px px-5 md:grid-cols-4 md:px-8">
          {facts.map(([k, v]) => (
            <div key={k} className="py-8 md:pr-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">{k}</dt>
              <dd className="mt-2 text-lg font-medium tracking-[-0.02em]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <Eyebrow label="How we work" />
          <h2 className="mt-5 text-4xl font-medium tracking-tightest md:text-6xl">What you can expect</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} className="h-full">
              <div className="h-full bg-paper p-7 md:p-9">
                <span className="block h-2 w-2 bg-accent" />
                <h3 className="mt-6 text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-nav="dark" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-5">
            <Eyebrow label="How we build" tone="dark" />
            <h2 className="mt-5 text-4xl font-medium tracking-tightest md:text-5xl">The right tool for the job</h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
              Not sure which you need? Read our{' '}
              <Link to="/guides/wordpress-vs-wix-vs-custom" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                WordPress vs Wix vs custom guide
              </Link>
              .
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            {howWeBuild.map((h) => (
              <div key={h.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-xl font-medium">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-8 md:py-32">
        <TextReveal
          lines={['Let’s talk about', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">your business.</span>]}
          className="text-[11vw] font-medium leading-[0.95] tracking-tightest md:text-7xl"
        />
        <Reveal delay={0.2} className="flex flex-wrap gap-3">
          <Button to={whatsappLink("Hi UPWRD! I'd like to chat about a website for my business.")} variant="accent">
            Chat on WhatsApp
          </Button>
          <Button to="/work" variant="outline-dark">
            See our work
          </Button>
        </Reveal>
      </section>
    </div>
  )
}
