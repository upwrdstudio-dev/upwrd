import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import NodeNetwork from './NodeNetwork'
import Magnetic from './Magnetic'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(35)
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 20 })
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 20 })
  const background = useTransform(
    [springGlowX, springGlowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(600px circle at ${gx}% ${gy}%, rgba(0,194,168,0.16), transparent 65%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-navy text-cream"
    >
      {/* Cursor-reactive ambient glow — desktop only via pointer:fine check above.
          On mobile this just stays gently centered instead of tracking touch,
          which would feel laggy rather than premium. */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-5"
          >
            Malaysia · Digital Agency
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-700 text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6"
          >
            We build the systems
            <br />
            <span className="bg-gradient-to-r from-teal via-cream to-teal bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              businesses run on.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-cream/70 text-base md:text-lg leading-relaxed max-w-md mb-9"
          >
            Websites, AI automation, and design — connected as one system,
            not sold as separate favors. Built for SMEs who want fewer manual
            tasks and more actual growth.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Magnetic
              href="#work"
              className="inline-flex items-center gap-2 bg-teal text-navy font-medium text-sm px-6 py-3 rounded-full hover:bg-teal-dim transition-colors"
            >
              See our work
            </Magnetic>
            <Magnetic
              href="#contact"
              className="inline-flex items-center gap-2 border border-cream/25 text-cream font-medium text-sm px-6 py-3 rounded-full hover:border-cream/50 transition-colors"
            >
              Start a project
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        >
          {/* Gentle continuous float so the hero never feels static */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <NodeNetwork />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}