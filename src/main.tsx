import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './Layout'
import './index.css'

const loadHome = () => import('./pages/HomePage')
const loadWork = () => import('./pages/WorkPage')
const loadDesign = () => import('./pages/DesignPage')

const HomePage = lazy(loadHome)
const WorkPage = lazy(loadWork)
const DesignPage = lazy(loadDesign)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Concept sites render outside the UPWRD layout, so each looks like a
// standalone client website.
const OndehBakehouse = lazy(() => import('./concepts/OndehBakehouse'))
const HaliaHouse = lazy(() => import('./concepts/HaliaHouse'))
const NorthlineAdvisory = lazy(() => import('./concepts/NorthlineAdvisory'))
const concept = (Page: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen bg-[#F4F2EC]" />}>
    <Page />
  </Suspense>
)

// Warm the other routes once the first page is idle, so navigation is instant.
const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500))
idle(() => {
  loadHome()
  loadWork()
  loadDesign()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/concepts/ondeh-bakehouse" element={concept(OndehBakehouse)} />
          <Route path="/concepts/halia-house" element={concept(HaliaHouse)} />
          <Route path="/concepts/northline-advisory" element={concept(NorthlineAdvisory)} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
