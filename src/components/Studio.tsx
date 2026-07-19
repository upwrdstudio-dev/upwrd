import { motion } from 'framer-motion'
import ClipReveal from './ClipReveal'

export default function Studio() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative h-[50vh] md:h-auto order-1">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
            alt="Team reviewing a design on screen together"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy/10" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 bg-navy text-cream rounded-full px-4 py-2 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Building in public</span>
          </motion.div>
        </div>

        <div className="order-2 flex flex-col justify-center px-6 md:px-16 py-16 md:py-0">
          <ClipReveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-dim mb-6">
              How we think
            </p>
            <h2 className="font-display font-700 text-[10vw] md:text-6xl text-navy tracking-tight mb-8 leading-[0.88]">
              Design is a
              <br />
              business
              <br />
              <span className="text-coral">decision.</span>
            </h2>
            <p className="text-ink/60 text-base leading-relaxed max-w-md mb-5">
              Not decoration. Every layout choice, every automation, every
              line of copy is there to move a business metric — more
              enquiries, fewer manual hours, a customer who trusts you faster.
            </p>
            <p className="text-ink/60 text-base leading-relaxed max-w-md">
              That's the difference between a website that looks nice in a
              portfolio and one that actually earns its keep.
            </p>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}