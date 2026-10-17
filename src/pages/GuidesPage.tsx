import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { Arrow } from '../components/Button'
import { guideMeta as guides } from '../data/guideMeta'

export default function GuidesPage() {
  return (
    <div className="bg-paper">
      <SEO path="/guides" />
      <PageHeader eyebrow="Guides" title="Guides" count={guides.length}>
        <p className="max-w-md text-[15px] leading-relaxed text-ink/65 md:text-base">
          Straight answers to the questions small business owners ask us most — costs, platforms, Google Maps, domains and
          whether you need a website at all.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-40">
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.08} className="h-full">
              <article className="h-full">
                <Link
                  to={`/guides/${g.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/25"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">{g.readMins} min read</span>
                  <h2 className="mt-6 text-2xl font-medium leading-tight tracking-[-0.03em]">{g.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/65">{g.summary}</p>
                  <span className="mt-8 flex items-center gap-2 text-sm font-medium">
                    Read guide
                    <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
