import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

export const getLenis = () => lenis

export function scrollToTarget(target: HTMLElement | number, opts: { immediate?: boolean } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: opts.immediate, duration: 1.4 })
    return
  }
  const behavior = opts.immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') window.scrollTo({ top: target, behavior })
  else target.scrollIntoView({ behavior })
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
