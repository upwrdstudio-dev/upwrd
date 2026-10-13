// Build-time renderer used by scripts/prerender-meta.mjs. It renders a route
// to an HTML string so each prerendered page carries its real text and links
// for crawlers that don't run JavaScript. The browser never loads this file;
// it boots from main.tsx as usual. Routes mirror main.tsx but are imported
// directly instead of lazily, so everything renders in one pass.
import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import DesignPage from './pages/DesignPage'
import ServicePage from './pages/ServicePage'
import AboutPage from './pages/AboutPage'
import GuidesPage from './pages/GuidesPage'
import GuidePage from './pages/GuidePage'
import NotFoundPage from './pages/NotFoundPage'
import OndehBakehouse from './concepts/OndehBakehouse'
import HaliaHouse from './concepts/HaliaHouse'
import NorthlineAdvisory from './concepts/NorthlineAdvisory'

type HelmetContext = { helmet?: HelmetServerState | null }

// Returns the page markup plus any JSON-LD the page declared through Helmet,
// so structured data is in the static HTML too.
export function render(url: string) {
  const helmetContext: HelmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/concepts/ondeh-bakehouse" element={<OndehBakehouse />} />
          <Route path="/concepts/halia-house" element={<HaliaHouse />} />
          <Route path="/concepts/northline-advisory" element={<NorthlineAdvisory />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>,
  )
  const helmet = helmetContext.helmet
  // Head tags the page declared through Helmet: JSON-LD, plus links such as
  // the canonical URL and a concept site's own font stylesheet.
  const head = [helmet?.link.toString(), helmet?.script.toString()].filter(Boolean).join('\n')
  return { html, head }
}
