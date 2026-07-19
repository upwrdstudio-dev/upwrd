import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './Layout'
import { RouteLoadingProvider } from './RouteLoadingContext'
import './index.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const DesignPage = lazy(() => import('./pages/DesignPage'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <RouteLoadingProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/design" element={<DesignPage />} />
            </Route>
          </Routes>
        </RouteLoadingProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)