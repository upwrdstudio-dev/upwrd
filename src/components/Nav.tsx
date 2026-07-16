import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRouteLoading } from '../RouteLoadingContext'

const links = [
  { href: '/#services', label: 'Services', isPage: false },
  { href: '/work', label: 'Work', isPage: true },
  { href: '/design', label: 'Design', isPage: true },
  { href: '/#process', label: 'Process', isPage: false },
  { href: '/#pricing', label: 'Pricing', isPage: false },
]

function NavLink({ href, label, isPage }: { href: string; label: string; isPage: boolean }) {
  const { startLoading } = useRouteLoading()
  return (
    <Link
      to={href}
      onClick={() => isPage && startLoading()}
      className="relative group font-mono text-xs uppercase tracking-widest text-ink/70 hover:text-navy transition-colors"
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-px w-0 bg-teal group-hover:w-full transition-all duration-300 ease-out" />
    </Link>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { startLoading } = useRouteLoading()

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => startLoading()}
          className="font-display font-700 text-lg tracking-tight text-navy"
        >
          UPWRD<span className="text-teal">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="hidden md:inline-flex"
        >
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-navy text-cream text-sm font-medium px-5 py-2.5 rounded-full hover:bg-navy-light transition-colors"
          >
            Start a project
          </Link>
        </motion.div>

        <button
          type="button"
          className="md:hidden text-navy touch-manipulation p-1 -m-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-line bg-cream overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col items-start gap-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={l.href}
                    onClick={() => {
                      setOpen(false)
                      if (l.isPage) startLoading()
                    }}
                    className="self-start font-mono text-xs uppercase tracking-widest text-ink/70"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center bg-navy text-cream text-sm font-medium px-5 py-2.5 rounded-full"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}