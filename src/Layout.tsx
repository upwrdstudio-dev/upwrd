import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollToHash from './components/ScrollToHash'
import BackToTop from './components/BackToTop'
import WhatsAppFloat from './components/WhatsAppFloat'
import SmoothScroll from './components/SmoothScroll'
import RouteCurtain from './components/RouteCurtain'

export default function Layout() {
  return (
    // Visitors who ask their device for less motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <SmoothScroll />
        <ScrollToHash />
        <RouteCurtain />
        <Cursor />
        <Nav />
        <main>
          <Suspense fallback={<div className="min-h-[100svh] bg-paper" />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
      </div>
    </MotionConfig>
  )
}
