import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import RollText from './RollText'
import { lockScroll } from '../lib/scroll'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { CONTACT } from '../data/site'

const links = [
  { to: '/#services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/design', label: 'Design' },
  { to: '/#process', label: 'Process' },
  { to: '/#pricing', label: 'Pricing' },
]

// Vertical centre of the floating bar, where we sample what's underneath.
const PROBE_Y = 44

const themes = {
  dark: {
    bar: 'border-white/10 bg-ink/80 text-paper shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]',
    link: 'text-white/65 hover:text-white',
    active: 'text-white',
    hover: 'bg-white/10',
    button: 'bg-white/10 hover:bg-white/15',
  },
  light: {
    bar: 'border-ink/[0.08] bg-white/80 text-ink shadow-[0_10px_40px_-14px_rgba(10,10,10,0.22)]',
    link: 'text-ink/65 hover:text-ink',
    active: 'text-ink',
    hover: 'bg-ink/[0.06]',
    button: 'bg-ink/[0.06] hover:bg-ink/10',
  },
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [surface, setSurface] = useState<'dark' | 'light'>('dark')
  const { pathname } = useLocation()
  const { scrollY } = useScroll()

  // Sections marked data-nav="dark" flip the bar to its dark skin; everything
  // else gets the light one, so it always contrasts with what's behind it.
  const probe = useCallback(() => {
    const overDark = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]')).some((el) => {
      const r = el.getBoundingClientRect()
      return r.top <= PROBE_Y && r.bottom >= PROBE_Y
    })
    setSurface(overDark ? 'dark' : 'light')
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160)
    probe()
  })

  useEffect(() => {
    setOpen(false)
    // Pages are lazy-loaded, so re-sample a few times while content mounts.
    const timers = [0, 120, 450, 1000].map((t) => setTimeout(probe, t))
    window.addEventListener('resize', probe)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', probe)
    }
  }, [pathname, probe])

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [open])

  const t = themes[open ? 'dark' : surface]

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-140%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-[300] px-3 pt-3 md:px-6 md:pt-5"
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-500 md:pl-6 ${t.bar}`}
        >
          <Link to="/" aria-label="UPWRD Studio home" className="-my-2 py-2">
            <Logo className="w-[100px]" />
          </Link>

          <nav className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {links.map((l) => {
              const active = pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onMouseEnter={() => setHovered(l.to)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${active ? t.active : t.link}`}
                >
                  {hovered === l.to && (
                    <motion.span
                      layoutId="nav-hover"
                      className={`absolute inset-0 rounded-full transition-colors duration-500 ${t.hover}`}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                  {active && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 bg-accent" />}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/#contact"
              className="group hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep sm:inline-flex"
            >
              <RollText>Start a project</RollText>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`grid h-10 w-10 touch-manipulation place-items-center rounded-full transition-colors duration-500 lg:hidden ${t.button}`}
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                  animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[290] flex flex-col justify-between bg-ink px-6 pb-8 pt-28 text-paper md:px-10 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav className="flex flex-col">
              {[...links, { to: '/#contact', label: 'Contact' }].map((l, i) => (
                <div key={l.to} className="overflow-hidden border-b border-white/10">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE_OUT }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3 text-[2.6rem] font-medium leading-tight tracking-tightest md:text-6xl"
                    >
                      {l.label}
                      <span className="font-mono text-xs tracking-normal text-white/50">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
              className="flex flex-col gap-2 text-sm text-white/65"
            >
              <a href={`mailto:${CONTACT.email}`} className="text-paper">
                {CONTACT.email}
              </a>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram — {CONTACT.instagram}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
