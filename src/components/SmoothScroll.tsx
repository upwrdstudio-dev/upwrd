import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../lib/scroll'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    // Mouse/trackpad only. Phones already scroll natively (Lenis leaves touch
    // alone anyway), so running it there adds nothing but another layer
    // listening to touch input.
    if (prefersReducedMotion() || !hasFinePointer()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
