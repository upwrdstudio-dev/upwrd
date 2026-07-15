import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#design', label: 'Design' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group font-mono text-xs uppercase tracking-widest text-ink/70 hover:text-navy transition-colors"
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-px w-0 bg-teal group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-700 text-lg tracking-tight text-navy">
          UPWRD<span className="text-teal">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="hidden md:inline-flex items-center gap-2 bg-navy text-cream text-sm font-medium px-5 py-2.5 rounded-full hover:bg-navy-light transition-colors"
        >
          Start a project
        </motion.a>

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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="md:hidden border-t border-line bg-cream overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-mono text-xs uppercase tracking-widest text-ink/70"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center bg-navy text-cream text-sm font-medium px-5 py-2.5 rounded-full"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}