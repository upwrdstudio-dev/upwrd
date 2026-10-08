import type { ReactNode } from 'react'
import TextReveal from './TextReveal'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeading'

type PageHeaderProps = {
  eyebrow: string
  title: string
  count: number
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, count, children }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
      <Reveal y={12}>
        <Eyebrow label={eyebrow} />
      </Reveal>
      <div className="mt-6 flex items-start gap-3">
        <TextReveal
          as="h1"
          lines={[title]}
          delay={0.1}
          className="text-[24vw] font-medium leading-[0.85] tracking-[-0.065em] md:text-[13rem]"
        />
        <Reveal delay={0.5} y={10}>
          <span className="mt-[1vw] block font-mono text-sm text-ink/50 md:mt-6 md:text-base">
            ({String(count).padStart(2, '0')})
          </span>
        </Reveal>
      </div>
      {children && (
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
            {children}
          </div>
        </Reveal>
      )}
    </header>
  )
}
