import { createContext, useContext, useRef, useState, type ReactNode } from 'react'

type RouteLoadingContextValue = {
  startLoading: () => void
  stopLoading: () => void
  loading: boolean
}

const RouteLoadingContext = createContext<RouteLoadingContextValue | null>(null)

const SAFETY_TIMEOUT_MS = 500

export function RouteLoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startLoading = () => {
    setLoading(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setLoading(false), SAFETY_TIMEOUT_MS)
  }

  const stopLoading = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setLoading(false)
  }

  return (
    <RouteLoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </RouteLoadingContext.Provider>
  )
}

export function useRouteLoading() {
  const ctx = useContext(RouteLoadingContext)
  if (!ctx) throw new Error('useRouteLoading must be used within RouteLoadingProvider')
  return ctx
}