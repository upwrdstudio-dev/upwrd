import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ScrollToHash from './components/ScrollToHash'
import BackToTop from './components/BackToTop'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import RouteCurtain from './components/RouteCurtain'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <ScrollToHash />
      <Preloader />
      <RouteCurtain />
      <Cursor />
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-[100svh] bg-paper" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
