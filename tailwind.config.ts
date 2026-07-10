import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1B2D',
          light: '#16233A',
          dark: '#0A1320',
        },
        teal: {
          DEFAULT: '#00C2A8',
          dim: '#0A9C87',
        },
        ink: '#3A3F44',
        cream: '#F7F7F5',
        line: '#E4E1D8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
