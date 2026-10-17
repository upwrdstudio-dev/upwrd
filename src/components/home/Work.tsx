import ProjectCard from '../ProjectCard'
import Button from '../Button'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import { projects } from '../../data/projects'
import { concepts } from '../../data/concepts'

// Client work first, then the concept sites (clearly labelled), in a plain
// grid: scrolling stays normal, and every project is visible at a glance.
export default function Work() {
  return (
    <section id="work" data-nav="dark" className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <SectionHeading
          index="03"
          label="Selected work"
          tone="dark"
          lines={['Websites that', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">earn their keep.</span>]}
          aside={
            <div className="max-w-xs">
              <p className="text-[15px] leading-relaxed text-white/65">
                Three client websites live today, plus concept sites showing how we’d approach other industries. Hover a
                project to browse it.
              </p>
              <div className="mt-6">
                <Button to="/work" variant="light">
                  All projects
                </Button>
              </div>
            </div>
          }
        />

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 md:mt-24">Client work</p>
        <div className="mt-6 grid gap-16 md:grid-cols-3 md:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <ProjectCard project={p} index={i} frameClassName="aspect-[4/3]" />
            </Reveal>
          ))}
        </div>

        <p className="mt-20 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 md:mt-28">
          Concepts · fictional businesses we designed
        </p>
        <div className="mt-6 grid gap-16 md:grid-cols-3 md:gap-6">
          {concepts.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <ProjectCard project={c} index={i} frameClassName="aspect-[4/3]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
