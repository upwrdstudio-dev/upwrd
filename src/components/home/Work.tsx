import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import ProjectCard from '../ProjectCard'
import Button, { Arrow } from '../Button'
import { Eyebrow } from '../SectionHeading'
import TextReveal from '../TextReveal'
import Reveal from '../Reveal'
import { projects } from '../../data/projects'

gsap.registerPlugin(ScrollTrigger)

function Intro() {
  return (
    <div className="flex flex-col justify-between gap-10 md:h-full md:py-4">
      <div>
        <Reveal y={12}>
          <Eyebrow index="02" label="Selected work" tone="dark" />
        </Reveal>
        <TextReveal
          lines={['Websites', 'that earn', <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-soft">their keep.</span>]}
          className="mt-6 text-[13vw] font-medium leading-[0.92] tracking-tightest md:text-[5.2vw] 2xl:text-[5.5rem]"
        />
      </div>
      <Reveal delay={0.2}>
        <p className="max-w-xs text-[15px] leading-relaxed text-white/65">
          Real client work across hospitality and corporate services — built with the same care regardless of size.
        </p>
        <div className="mt-6">
          <Button to="/work" variant="light">
            All projects
          </Button>
        </div>
      </Reveal>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()
    // Desktop only: the section pins and vertical scroll drives the track
    // sideways. Phones get a plain vertical stack.
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} data-nav="dark" className="relative bg-ink text-paper md:h-[100svh] md:overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-5 py-24 md:h-full md:w-max md:flex-row md:items-stretch md:gap-[4vw] md:px-[4vw] md:py-[max(7rem,12vh)]"
      >
        <div className="md:w-[30vw] md:shrink-0">
          <Intro />
        </div>

        {projects.map((p, i) => (
          <div key={p.name} className="work-card md:flex md:shrink-0 md:items-center">
            <ProjectCard project={p} index={i} frameClassName="aspect-[16/11] md:aspect-[16/10]" className="w-full" />
          </div>
        ))}

        <div className="hidden md:flex md:w-[26vw] md:shrink-0 md:items-center">
          <Link
            to="/work"
            data-cursor="Open"
            className="group flex aspect-square w-full flex-col justify-between rounded-3xl bg-accent p-8 text-white transition-transform duration-700 ease-out-expo hover:scale-[0.98]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Full portfolio</span>
            <span className="flex items-end justify-between">
              <span className="text-5xl font-medium leading-[0.95] tracking-tightest">
                See all
                <br />
                projects
              </span>
              <Arrow className="h-10 w-10 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-[4vw] right-[4vw] hidden h-px bg-white/10 md:block">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  )
}
