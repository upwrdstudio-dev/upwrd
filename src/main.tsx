import React, { lazy } from 'react'
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
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
