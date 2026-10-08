import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '../lib/scroll'

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true })
      return
    }

    // Pages are lazy-loaded, so the target may not exist yet when arriving
    // from another route — poll briefly until it mounts.
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer: ReturnType<typeof setTimeout>
    const attempt = () => {
      const el = document.getElementById(id)
      if (el) scrollToTarget(el)
      else if (tries++ < 30) timer = setTimeout(attempt, 60)
    }
    timer = setTimeout(attempt, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
