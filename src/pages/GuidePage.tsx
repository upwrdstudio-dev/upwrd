import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { Eyebrow } from '../components/SectionHeading'
import NotFoundPage from './NotFoundPage'
import { guides, type Block, type Guide } from '../data/guides'
import { SITE_URL, whatsappLink } from '../data/site'

const date = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function BlockView({ block }: { block: Block }) {
  if ('p' in block) return <p className="text-[17px] leading-[1.75] text-ink/80">{block.p}</p>
  if ('note' in block) return <p className="rounded-2xl bg-ink/[0.04] px-5 py-4 text-sm leading-relaxed text-ink/65">{block.note}</p>
  if ('list' in block)
    return (
      <ul className="space-y-3 text-[17px] leading-[1.65] text-ink/80">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  return (
    <div>
    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 md:hidden">Swipe to see all columns →</p>
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[540px] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-ink">
            {block.table.head.map((h, i) => (
              <th key={i} className="py-3 pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-ink/10">
              {row.map((cell, i) => (
                <td key={i} className={`py-3 pr-4 align-top ${i === 0 ? 'font-medium' : 'text-ink/75'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

function jsonLd(g: Guide) {
  const url = `${SITE_URL}/guides/${g.slug}`
  const org = { '@type': 'Organization', name: 'UPWRD Studio', url: SITE_URL, logo: `${SITE_URL}/brand/upwrd-app-icon.png` }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: g.title,
        description: g.summary,
        url,
        mainEntityOfPage: url,
        datePublished: g.published,
        dateModified: g.updated,
        image: `${SITE_URL}/brand/upwrd-og.png`,
        author: org,
        publisher: org,
      },
      {
        '@type': 'FAQPage',
        mainEntity: g.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: g.label, item: url },
        ],
      },
    ],
  }
}

export default function GuidePage() {
  const { slug } = useParams()
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return <NotFoundPage />
  const others = guides.filter((g) => g.slug !== guide.slug)

  return (
    <article className="bg-paper">
      <SEO path={`/guides/${guide.slug}`} jsonLd={jsonLd(guide)} />

      <header className="mx-auto max-w-3xl px-5 pb-10 pt-36 md:pt-44">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>{' '}
          /{' '}
          <Link to="/guides" className="hover:text-ink">
            Guides
          </Link>
        </nav>
        <h1 className="text-[9vw] font-medium leading-[1.02] tracking-tightest sm:text-5xl md:text-6xl">{guide.title}</h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
          UPWRD Studio · Updated {date(guide.updated)} · {guide.readMins} min read
        </p>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-24">
        <Reveal y={16}>
          <div className="rounded-3xl border-l-4 border-accent bg-white px-6 py-6 md:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Short answer</p>
            <p className="mt-3 text-lg leading-relaxed text-ink md:text-xl">{guide.answer}</p>
          </div>
        </Reveal>

        {guide.sections.map((s) => (
          <section key={s.heading} className="mt-14">
            <h2 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{s.heading}</h2>
            <div className="mt-5 space-y-5">
              {s.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16">
          <h2 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">Frequently asked questions</h2>
          <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {guide.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="text-lg font-medium tracking-[-0.02em]">{f.q}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-ink/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {guide.sources && (
          <section className="mt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Sources</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink/70 underline decoration-ink/20 underline-offset-4 hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Reveal>
          <div className="mt-16 rounded-3xl bg-ink p-8 text-paper md:p-10">
            <Eyebrow label="Need a hand?" tone="dark" />
            <p className="mt-4 text-2xl font-medium leading-snug tracking-[-0.03em] md:text-3xl">
              Get a free check of your website or Instagram — honest advice, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={whatsappLink(`Hi UPWRD! I read your guide "${guide.label}" and have a question.`)} variant="accent">
                Ask on WhatsApp
              </Button>
              {guide.related.map((r) => (
                <Link key={r.to} to={r.to} className="self-center text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <nav aria-label="More guides" className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">More guides</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link to={`/guides/${g.slug}`} className="block rounded-2xl border border-ink/10 bg-white/60 p-5 transition-colors hover:border-ink/25 hover:bg-white">
                  <span className="font-medium">{g.title}</span>
                  <span className="mt-1 block text-sm text-ink/60">{g.readMins} min read</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}
