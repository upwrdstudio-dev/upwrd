import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The build-time prerender (src/entry-server.tsx) runs in Node. Bundle all
  // dependencies into it, since some (gsap, lenis) ship browser-style ES
  // modules that Node can't import directly.
  ssr: { noExternal: true },
})
