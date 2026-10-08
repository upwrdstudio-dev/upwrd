import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#111111',
          800: '#1A1A1A',
          700: '#2A2A2A',
        },
        paper: {
          DEFAULT: '#F3F3EF',
          dim: '#E8E8E2',
        },
        accent: {
          DEFAULT: '#2B5BFF',
          soft: '#8EB0FF',
          deep: '#1A44E0',
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
    },
  },
  plugins: [],
} satisfies Config
