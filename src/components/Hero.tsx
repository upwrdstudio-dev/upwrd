import NodeNetwork from './NodeNetwork'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-cream">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal mb-5">
            Malaysia · Digital Agency
          </p>
          <h1 className="font-display font-700 text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
            We build the systems
            <br />
            businesses run on.
          </h1>
          <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-md mb-9">
            Websites, AI automation, and design — connected as one system,
            not sold as separate favors. Built for SMEs who want fewer manual
            tasks and more actual growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-teal text-navy font-medium text-sm px-6 py-3 rounded-full hover:bg-teal-dim transition-colors"
            >
              See our work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-cream/25 text-cream font-medium text-sm px-6 py-3 rounded-full hover:border-cream/50 transition-colors"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="relative">
          <NodeNetwork />
        </div>
      </div>
    </section>
  )
}
