import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Magnetic from './Magnetic'

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(35)
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 20 })
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 20 })
  const background = useTransform(
    [springGlowX, springGlowY],
    ([gx, gy]: number[]) => `radial-gradient(500px circle at ${gx}% ${gy}%, rgba(0,194,168,0.14), transparent 65%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-navy text-cream overflow-hidden min-h-[92vh] md:min-h-screen grid md:grid-cols-2"
    >
      <motion.div className="absolute inset-0 pointer-events-none z-10" style={{ background }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-[42vh] md:h-auto order-1 md:order-2"
      >
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85"
          alt="Designer working closely with code and layout on a laptop"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-navy/40 md:bg-gradient-to-l md:from-navy/10 md:via-navy/0 md:to-navy/50" />

        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden md:block absolute bottom-8 right-0 translate-x-1/3 font-display text-[16vw] leading-none text-cream/10 select-none pointer-events-none"
        >
          03
        </motion.span>
      </motion.div>

      <div className="relative z-20 order-2 md:order-1 flex flex-col justify-center px-6 md:px-14 py-14 md:py-0">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={item}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal mb-8"
        >
          UPWRD — Malaysia
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={item}
          transition={{ delay: 0.1 }}
          className="font-display font-700 text-[16vw] md:text-[6.2vw] leading-[0.82] tracking-tight"
        >
          Digital
          <br />
          systems
          <br />
          <span className="text-coral">that work</span><span className="text-teal">.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={item}
          transition={{ delay: 0.25 }}
          className="text-cream/60 text-base md:text-lg leading-relaxed max-w-sm mt-10"
        >
          Websites, AI automation, and design — built as one system for
          Malaysian SMEs who want fewer manual tasks and more actual growth.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={item}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-14 z-20 items-center gap-3"
      >
        <span className="w-8 h-px bg-cream/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">Scroll</span>
      </motion.div>
    </section>
  )
}