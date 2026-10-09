import type { CSSProperties } from 'react'

type CircleTextProps = {
  text: string
  /** Radius as a CSS length; set responsively with an arbitrary `[--r:…]` class instead if needed. */
  radius?: string
  className?: string
}

// Text set around a circle by rotating each character about the centre.
// SVG <textPath> with textLength looks the same but Safari ignores
// textLength, so the letters bunch up and overlap; this renders identically
// everywhere. Size it with the --r custom property (e.g. "[--r:96px]").
export default function CircleText({ text, radius, className = '' }: CircleTextProps) {
  const chars = Array.from(text)
  const style = (radius ? { '--r': radius } : {}) as CSSProperties

  return (
    <div
      role="img"
      aria-label={text.replace(/[·•]/g, ' ').replace(/\s+/g, ' ').trim()}
      className={`relative h-[calc(var(--r)*2)] w-[calc(var(--r)*2)] ${className}`}
      style={style}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-0 block h-[var(--r)] origin-bottom text-center leading-none"
          style={{ transform: `translateX(-50%) rotate(${(i * 360) / chars.length}deg)` }}
        >
          {c}
        </span>
      ))}
    </div>
  )
}
