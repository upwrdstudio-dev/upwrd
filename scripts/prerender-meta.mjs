// Runs after `vite build`. WhatsApp, Instagram and other link-preview bots
// read raw HTML and don't run JavaScript, so tags set by React never reach
// them. For each route in src/data/pageMeta.json this writes a copy of
// dist/index.html with that page's title, description and preview image
// baked in: "/" → dist/index.html, "/work" → dist/work.html,
// "/concepts/x" → dist/concepts/x.html. Cloudflare serves "/work" from
// work.html directly; the React app then boots exactly as before.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE_URL = 'https://upwrdstudio.com'

const pages = JSON.parse(readFileSync(join(root, 'src/data/pageMeta.json'), 'utf8'))
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function render(path, meta) {
  const url = SITE_URL + path
  const image = SITE_URL + meta.image
  // data-rh marks these as react-helmet tags, so Helmet replaces them on
  // load instead of leaving duplicates in the live page.
  const tag = (attr, key, value) => `<meta ${attr}="${key}" content="${esc(value)}" data-rh="true" />`
  const head = [
    `<link rel="canonical" href="${url}" data-rh="true" />`,
    meta.noindex ? tag('name', 'robots', 'noindex') : '',
    tag('property', 'og:type', 'website'),
    tag('property', 'og:site_name', 'UPWRD Studio'),
    tag('property', 'og:title', meta.title),
    tag('property', 'og:description', meta.description),
    tag('property', 'og:url', url),
    tag('property', 'og:image', image),
    tag('property', 'og:image:width', '1200'),
    tag('property', 'og:image:height', '630'),
    tag('name', 'twitter:card', 'summary_large_image'),
    tag('name', 'twitter:title', meta.title),
    tag('name', 'twitter:description', meta.description),
    tag('name', 'twitter:image', image),
  ]
    .filter(Boolean)
    .join('\n    ')

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title data-rh="true">${esc(meta.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, tag('name', 'description', meta.description))
    .replace('</head>', `    ${head}\n  </head>`)
}

for (const [path, meta] of Object.entries(pages)) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(path, meta))
  console.log(`prerender-meta: ${path} → ${file.slice(dist.length + 1)}`)
}
