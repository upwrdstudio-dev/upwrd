import type { ReactNode } from 'react'
import Reveal from './Reveal'
import TextReveal from './TextReveal'

type SectionHeadingProps = {
  index: string
  label: string
  lines: ReactNode[]
  tone?: 'light' | 'dark'
  aside?: ReactNode
  className?: string
}

export function Eyebrow({ index, label, tone = 'light' }: { index?: string; label: string; tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] ${
        tone === 'dark' ? 'text-white/60' : 'text-ink/60'
      }`}
    >
      <span className="inline-block h-1.5 w-1.5 bg-accent" />
      {index && <span>({index})</span>}
      <span>{label}</span>
    </p>
  )
}

export default function SectionHeading({ index, label, lines, tone = 'light', aside, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <Reveal y={12}>
          <Eyebrow index={index} label={label} tone={tone} />
        </Reveal>
        <TextReveal
          lines={lines}
          className={`mt-6 text-[13vw] font-medium leading-[0.92] tracking-tightest sm:text-6xl md:text-7xl lg:text-[5.5rem] ${
            tone === 'dark' ? 'text-paper' : 'text-ink'
          }`}
        />
      </div>
      {aside && <Reveal delay={0.2}>{aside}</Reveal>}
    </div>
  )
}
