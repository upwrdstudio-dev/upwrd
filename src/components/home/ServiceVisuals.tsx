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

const products = [
  { name: 'Pandan Croissant', price: 'RM 12.90', tone: 'bg-[#E9D9B8]' },
  { name: 'Kaya Bun', price: 'RM 7.50', tone: 'bg-[#D7E4C6]' },
  { name: 'Gift Box', price: 'RM 48.00', tone: 'bg-[#E6CFC5]' },
  { name: 'Coffee Beans', price: 'RM 36.00', tone: 'bg-[#D6D3CC]' },
]

// A shop that sells itself: products get added to the cart on a loop, the
// cart count ticks up and the header briefly confirms the paid order.
export function StoreVisual() {
  const cycle = { duration: 4.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] as const }
  return (
    <div className="flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-2xl md:h-auto border border-white/10 bg-[#141414] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="relative h-6 flex-1">
          <motion.span
            className="absolute left-0 top-1.5 h-3 w-14 rounded-full bg-white/80"
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ ...cycle, times: [0, 0.42, 0.48, 0.88, 0.94] }}
          />
          <motion.span
            className="absolute left-0 top-0 flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-2.5 text-[10px] font-medium text-white"
            animate={{ opacity: [0, 0, 1, 1, 0], x: [-6, -6, 0, 0, -6] }}
            transition={{ ...cycle, times: [0, 0.42, 0.5, 0.88, 0.94] }}
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
              <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            Order paid · FPX
          </motion.span>
        </span>
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white/10">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 7h12l-1.2 11H7.2L6 7Zm3 0a3 3 0 0 1 6 0" />
          </svg>
          <motion.span
            className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold text-white"
            animate={{ scale: [0, 0, 1.3, 1, 1, 0] }}
            transition={{ ...cycle, times: [0, 0.25, 0.32, 0.38, 0.9, 1] }}
          >
            1
          </motion.span>
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 content-start gap-2.5 p-3 md:gap-3 md:p-4">
        {products.map((p, i) => (
          <div key={p.name} className={`flex-col rounded-xl bg-white/[0.04] p-2 ${i > 1 ? 'hidden md:flex' : 'flex'}`}>
            <div className={`aspect-[4/3] rounded-lg ${p.tone}`} />
            <span className="mt-2 truncate text-[10px] text-white/80 md:text-[11px]">{p.name}</span>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-white md:text-[11px]">{p.price}</span>
              <motion.span
                className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[11px] leading-none text-white"
                animate={i === 0 ? { backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', '#2B5BFF', '#2B5BFF', 'rgba(255,255,255,0.1)'] , scale: [1, 1, 0.85, 1, 1] } : undefined}
                transition={i === 0 ? { ...cycle, times: [0, 0.2, 0.26, 0.4, 1] } : undefined}
              >
                +
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
