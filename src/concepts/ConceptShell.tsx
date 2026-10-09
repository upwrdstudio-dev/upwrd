import { useEffect, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogoMark } from '../components/Logo'
import { EASE_OUT } from '../lib/motion'

type ConceptShellProps = {
  title: string
  description: string
  fontsHref: string
  themeColor: string
  children: ReactNode
}

// Wraps a concept site: its own fonts and title, no UPWRD chrome, and a small
// tag making clear the business is fictional. Concepts are noindexed so they
// never compete in search with a real business that shares the name.
export default function ConceptShell({ title, description, fontsHref, themeColor, children }: ConceptShellProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>{`${title} — Concept by UPWRD Studio`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content={themeColor} />
        <link rel="stylesheet" href={fontsHref} />
      </Helmet>

      {children}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
        className="fixed bottom-4 left-4 z-[400]"
      >
        <Link
          to="/work#concepts"
          aria-label="Concept by UPWRD Studio — fictional business. Back to UPWRD work."
          className="group flex items-center gap-2 rounded-full bg-[#0A0A0A]/90 p-2 font-sans text-[12px] text-white shadow-lg backdrop-blur transition-colors hover:bg-[#0A0A0A] sm:py-1.5 sm:pl-2 sm:pr-3.5"
        >
          <LogoMark className="h-5 w-5 text-white" />
          {/* Icon-only on phones so it never covers page content. */}
          <span className="hidden sm:inline">
            Concept by <span className="font-semibold">UPWRD Studio</span>
            <span className="text-white/50"> · fictional business</span>
          </span>
          <span className="hidden transition-transform group-hover:translate-x-0.5 sm:inline">→</span>
        </Link>
      </motion.div>
    </>
  )
}
