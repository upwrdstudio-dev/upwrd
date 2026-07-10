export default function NodeNetwork() {
  // Node graph echoing n8n-style automation workflows — the visual language
  // of UPWRD's actual automation work, not a generic decorative pattern.
  const nodes = [
    { id: 'web', x: 60, y: 90, label: 'WEBSITE' },
    { id: 'auto', x: 300, y: 40, label: 'AUTOMATE' },
    { id: 'design', x: 300, y: 200, label: 'DESIGN' },
    { id: 'out', x: 520, y: 120, label: 'GROWTH' },
  ]
  const edges: [string, string][] = [
    ['web', 'auto'],
    ['web', 'design'],
    ['auto', 'out'],
    ['design', 'out'],
  ]

  const findNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <svg
      viewBox="0 0 580 260"
      className="w-full h-auto"
      aria-hidden="true"
      role="presentation"
    >
      {edges.map(([a, b], i) => {
        const from = findNode(a)
        const to = findNode(b)
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#00C2A8"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="16"
              to="0"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </line>
        )
      })}

      {nodes.map((n, i) => (
        <g key={n.id} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}>
          <circle cx={n.x} cy={n.y} r="26" fill="#0F1B2D" stroke="#00C2A8" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="4" fill="#00C2A8" />
          <text
            x={n.x}
            y={n.y + 44}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="11"
            fill="#C9CDD3"
            letterSpacing="1.5"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
