import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Logo3D from './Logo3D'

export default function Contact() {
  return (
    <footer id="contact" className="bg-navy-dark text-cream py-24 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-6">
            Let's talk
          </p>
          <h2 className="font-display font-700 text-[13vw] md:text-8xl tracking-tight leading-[0.85] mb-14 md:mb-20">
            Let's build
            <br />
            something<span className="text-coral">.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Reveal delay={0.1}>
            <p className="text-cream/60 text-sm md:text-base leading-relaxed max-w-sm">
              Every project starts with understanding the business problem
              first. Reach out and we'll figure out the right fit together.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6">
              <motion.a
                href="mailto:upwrdstudio@gmail.com"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group flex items-center justify-between border-b border-cream/15 pb-4 hover:border-teal/50 transition-colors"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-cream/40 mb-1">Email</span>
                  <span className="font-display text-xl">upwrdstudio@gmail.com</span>
                </span>
                <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </motion.a>
              <motion.a
                href="https://instagram.com/upwrdstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group flex items-center justify-between border-b border-cream/15 pb-4 hover:border-teal/50 transition-colors"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-cream/40 mb-1">Instagram</span>
                  <span className="font-display text-xl">@upwrdstudio</span>
                </span>
                <span className="text-teal opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </motion.a>
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center mb-16">
          <Logo3D />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-cream/10">
          <p className="font-display text-sm text-cream/50">
            UPWRD Studio — Building clean, modern digital experiences.
          </p>
          <p className="text-xs text-cream/30">© {new Date().getFullYear()} UPWRD Studio. Malaysia.</p>
        </div>
      </div>
    </footer>
  )
}