import { useSyncExternalStore } from 'react'

// Tracks whether the first-visit preloader has finished, so the hero can hold
// its entrance animation until the curtain lifts instead of playing unseen.

const SESSION_KEY = 'upwrd-intro-seen'

function readSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

// Desktop only. On phones the intro would hold back the first meaningful
// paint on slower CPUs and networks — exactly where speed matters most (and
// where Google measures it) — so mobile visitors go straight to the hero.
function isDesktop() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px) and (pointer: fine)').matches
}

export const shouldPlayIntro = isDesktop() && !readSeen()

let done = !shouldPlayIntro
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  document.documentElement.classList.remove('intro')
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Storage can be unavailable (private mode); the intro just replays.
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useIntroDone() {
  // Server snapshot (build-time prerender): treat the intro as finished so
  // the hero renders its final content.
  return useSyncExternalStore(subscribe, () => done, () => true)
}
