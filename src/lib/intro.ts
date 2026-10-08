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

export const shouldPlayIntro = !readSeen()

let done = !shouldPlayIntro
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
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
  return useSyncExternalStore(subscribe, () => done)
}
