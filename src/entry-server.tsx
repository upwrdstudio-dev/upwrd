// Build-time renderer used by scripts/prerender-meta.mjs. It renders a route
// to an HTML string so each prerendered page carries its real text and links
// for crawlers that don't run JavaScript. The browser never loads this file;
// it boots from main.tsx as usual. Routes mirror main.tsx but are imported
// directly instead of lazily, so everything renders in one pass.
import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import DesignPage from './pages/DesignPage'
import ServicePage from './pages/ServicePage'
import NotFoundPage from './pages/NotFoundPage'
import OndehBakehouse from './concepts/OndehBakehouse'
import HaliaHouse from './concepts/HaliaHouse'
import NorthlineAdvisory from './concepts/NorthlineAdvisory'

export function render(url: string) {
  return renderToString(
    <HelmetProvider context={{}}>
      <StaticRouter location={url}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/concepts/ondeh-bakehouse" element={<OndehBakehouse />} />
          <Route path="/concepts/halia-house" element={<HaliaHouse />} />
          <Route path="/concepts/northline-advisory" element={<NorthlineAdvisory />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>,
  )
}
