import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import TextReveal from '../components/TextReveal'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'
import { concepts } from '../data/concepts'

export default function WorkPage() {
  const [featured, ...rest] = projects

  return (
    <div className="bg-paper">
      <SEO
        title="Our Work — Website Portfolio"
        description="Real client websites built by UPWRD Studio — restaurants, wine bars and corporate trust services across Malaysia."
        path="/work"
      />

      <PageHeader eyebrow="Portfolio" title="Work" count={projects.length}>
        <p className="max-w-md text-[15px] leading-relaxed text-ink/65 md:text-base">
          From neighbourhood restaurants to corporate trust brands — real client work, built with the same care
          regardless of size. Hover a project to browse it.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Hospitality · Corporate</p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-40">
        <Reveal>
          <ProjectCard project={featured} index={0} tone="light" frameClassName="aspect-[4/3] md:aspect-[16/8]" />
        </Reveal>
        <div className="mt-20 grid gap-20 md:mt-28 md:grid-cols-2 md:gap-6">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12} className={i % 2 === 1 ? 'md:mt-32' : ''}>
              <ProjectCard project={p} index={i + 1} tone="light" frameClassName="aspect-[4/3] md:aspect-[4/5]" />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="concepts" data-nav="dark" className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <SectionHeading
            index="C"
            label="Concepts"
            tone="dark"
            lines={[
              'Concept work.',
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">What we’d build for you.</span>,
            ]}
            aside={
              <p className="max-w-xs text-[15px] leading-relaxed text-white/65">
                Self-initiated sites for fictional businesses — how we’d approach industries beyond our client list. Open
                one to explore it.
              </p>
            }
          />
          <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-3 md:gap-6">
            {concepts.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <ProjectCard project={c} index={i} frameClassName="aspect-[4/3] md:aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-8 md:py-32">
          <TextReveal
            lines={['Your project', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">could be next.</span>]}
            className="text-[12vw] font-medium leading-[0.92] tracking-tightest md:text-7xl"
          />
          <Reveal delay={0.2}>
            <Button to="/#enquire" variant="dark">
              Start a project
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
