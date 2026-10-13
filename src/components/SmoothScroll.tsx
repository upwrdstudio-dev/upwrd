import { useEffect } from 'react'
import { setLenis } from '../lib/scroll'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

export default function SmoothScroll() {
  useEffect(() => {
    // Mouse/trackpad only. Phones scroll natively, and loading the libraries
    // lazily keeps them out of the initial download entirely on mobile.
    if (prefersReducedMotion() || !hasFinePointer()) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        const lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        setLenis(lenis)
        lenis.on('scroll', ScrollTrigger.update)
        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        cleanup = () => {
          gsap.ticker.remove(tick)
          lenis.destroy()
          setLenis(null)
        }
      },
    )

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
