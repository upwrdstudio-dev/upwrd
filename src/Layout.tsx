import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ScrollToHash from './components/ScrollToHash'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import { useRouteLoading } from './RouteLoadingContext'

export default function Layout() {
  const { loading } = useRouteLoading()

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollToHash />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Contact />
      <BackToTop />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
    </div>
  )
}