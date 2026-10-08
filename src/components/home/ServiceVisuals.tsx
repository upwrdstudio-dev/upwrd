import { motion } from 'framer-motion'

const loop = (delay: number, duration = 4.2) => ({
  duration,
  delay,
  repeat: Infinity,
  times: [0, 0.22, 0.82, 1],
  ease: [0.16, 1, 0.3, 1] as const,
})

// A wireframe page that keeps building itself.
export function WebVisual() {
  const bar = (className: string, delay: number) => (
    <motion.div
      className={`origin-left rounded-md ${className}`}
      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={loop(delay)}
    />
  )

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_rgba(10,10,10,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-ink/[0.06]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          {bar('h-3 w-16 bg-ink', 0)}
          <div className="flex gap-2">
            {bar('h-2 w-8 bg-ink/20', 0.1)}
            {bar('h-2 w-8 bg-ink/20', 0.15)}
            {bar('h-2 w-8 bg-ink/20', 0.2)}
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          {bar('h-6 w-[85%] bg-ink', 0.3)}
          {bar('h-6 w-[60%] bg-ink', 0.4)}
          {bar('h-2 w-[50%] bg-ink/25', 0.5)}
        </div>
        {bar('mt-2 h-8 w-28 rounded-full bg-accent', 0.6)}
        <div className="mt-auto grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-14 origin-bottom rounded-lg bg-ink/[0.07] md:h-20"
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={loop(0.7 + i * 0.08)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const flowNodes = [
  { id: 'in', x: 20, y: 96, w: 82, label: 'New enquiry' },
  { id: 'ai', x: 140, y: 96, w: 62, label: 'AI agent' },
  { id: 'wa', x: 238, y: 34, w: 84, label: 'WhatsApp' },
  { id: 'inv', x: 238, y: 96, w: 84, label: 'Invoice' },
  { id: 'crm', x: 238, y: 158, w: 84, label: 'Calendar' },
]

const flowPaths = [
  { id: 'p1', d: 'M102 111H140' },
  { id: 'p2', d: 'M202 111C222 111 218 49 238 49' },
  { id: 'p3', d: 'M202 111H238' },
  { id: 'p4', d: 'M202 111C222 111 218 173 238 173' },
]

// A workflow that runs on its own: data pulses travel from trigger to actions.
export function AutomationVisual() {
  return (
    <svg viewBox="0 0 340 222" className="h-full w-full" role="img" aria-label="Automation workflow diagram">
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>
      <rect width="340" height="222" fill="url(#dots)" />
      {flowPaths.map((p) => (
        <path
          key={p.id}
          id={p.id}
          d={p.d}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          style={{ animation: 'dash-flow 1.2s linear infinite' }}
        />
      ))}
      {flowPaths.map((p, i) => (
        <circle key={`dot-${p.id}`} r="3.5" fill="#2B5BFF">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i === 0 ? 0 : 0.6 + i * 0.25}s`}>
            <mpath href={`#${p.id}`} />
          </animateMotion>
        </circle>
      ))}
      {flowNodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height="30"
            rx="8"
            fill={n.id === 'ai' ? '#2B5BFF' : '#1A1A1A'}
            stroke={n.id === 'ai' ? '#2B5BFF' : 'rgba(255,255,255,0.14)'}
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + 19}
            textAnchor="middle"
            className="fill-white font-sans text-[10.5px]"
            style={{ letterSpacing: '-0.01em' }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

const tiles = [
  { r: 'rounded-tl-full', c: 'bg-white' },
  { r: 'rounded-full', c: 'bg-ink' },
  { r: 'rounded-br-full', c: 'bg-white/30' },
  { r: 'rounded-none', c: 'bg-ink' },
  { r: 'rounded-tr-full', c: 'bg-white' },
  { r: 'rounded-bl-full', c: 'bg-white/30' },
  { r: 'rounded-br-full', c: 'bg-white' },
  { r: 'rounded-tl-full', c: 'bg-white/30' },
  { r: 'rounded-full', c: 'bg-white' },
]

// A generative grid: tiles turn in quarter steps, so the composition keeps
// recomposing itself.
export function DesignVisual() {
  return (
    <div className="grid aspect-square h-full max-h-full grid-cols-3 gap-2 md:gap-3">
      {tiles.map((t, i) => (
        <div key={i} className="relative">
          <motion.div
            className={`absolute inset-0 ${t.r} ${t.c}`}
            animate={{ rotate: [0, 90, 90, 180, 180, 270, 270, 360] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: (i % 4) * 0.35 + Math.floor(i / 3) * 0.2,
              times: [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85],
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>
      ))}
    </div>
  )
}
