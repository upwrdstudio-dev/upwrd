import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import Button, { Arrow } from '../Button'
import { guides } from '../../data/guides'

// The guides people ask about most before buying a website.
const picks = ['website-cost-malaysia', 'google-business-profile-malaysia', 'landing-page-vs-website']

export default function HomeGuides() {
  const list = picks.map((slug) => guides.find((g) => g.slug === slug)).filter((g) => g !== undefined)

  return (
    <section id="guides" className="border-t border-ink/10 bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="08"
          label="Guides"
          lines={['Straight answers,', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">before you spend.</span>]}
          aside={
            <Button to="/guides" variant="dark">
              All guides
            </Button>
          }
        />
        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
          {list.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.06} className="h-full">
              <Link
                to={`/guides/${g.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/25"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">{g.readMins} min read</span>
                <h3 className="mt-6 text-2xl font-medium leading-tight tracking-[-0.03em]">{g.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/65">{g.summary}</p>
                <span className="mt-8 flex items-center gap-2 text-sm font-medium">
                  Read guide
                  <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
