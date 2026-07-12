import { motion } from 'framer-motion'
import NodeNetwork from './NodeNetwork'

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
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-cream">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-5"
          >
            Malaysia · Digital Agency
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-700 text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6"
          >
            We build the systems
            <br />
            businesses run on.
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
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 bg-teal text-navy font-medium text-sm px-6 py-3 rounded-full hover:bg-teal-dim transition-colors"
            >
              See our work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 border border-cream/25 text-cream font-medium text-sm px-6 py-3 rounded-full hover:border-cream/50 transition-colors"
            >
              Start a project
            </motion.a>
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