import { Link } from 'react-router-dom'
import RollText from './RollText'
import Magnetic from './Magnetic'

type Variant = 'dark' | 'light' | 'accent' | 'outline-light' | 'outline-dark'

const variants: Record<Variant, { base: string; dot: string }> = {
  dark: { base: 'bg-ink text-paper', dot: 'bg-accent text-white' },
  light: { base: 'bg-paper text-ink', dot: 'bg-ink text-paper' },
  accent: { base: 'bg-accent text-white', dot: 'bg-white text-accent' },
  'outline-light': { base: 'border border-white/20 text-paper hover:border-white/50', dot: 'bg-white text-ink' },
  'outline-dark': { base: 'border border-ink/15 text-ink hover:border-ink/40', dot: 'bg-ink text-paper' },
}

type ButtonProps = {
  to: string
  children: string
  variant?: Variant
  className?: string
  onClick?: () => void
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

export default function Button({ to, children, variant = 'dark', className = '', onClick }: ButtonProps) {
  const v = variants[variant]
  const isExternal = /^(https?:|mailto:|tel:)/.test(to)

  const inner = (
    <>
      <RollText className="pl-1 text-[15px] font-medium tracking-[-0.01em]">{children}</RollText>
      <span
        className={`relative grid h-8 w-8 place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-110 ${v.dot}`}
      >
        <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-6 group-hover:translate-x-6" />
        <Arrow className="absolute h-3.5 w-3.5 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  )

  const cls = `group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 transition-colors duration-300 ${v.base} ${className}`

  return (
    <Magnetic strength={0.2}>
      {isExternal ? (
        <a
          href={to}
          onClick={onClick}
          className={cls}
          {...(to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      ) : (
        <Link to={to} onClick={onClick} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  )
}
