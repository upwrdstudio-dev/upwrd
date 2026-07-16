import { useEffect } from 'react'
import { useRouteLoading } from '../RouteLoadingContext'

export function usePageReady() {
  const { stopLoading } = useRouteLoading()

  useEffect(() => {
    stopLoading()
  }, [])
}