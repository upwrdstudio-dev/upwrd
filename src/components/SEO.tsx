import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../data/site'
import pageMeta from '../data/pageMeta.json'

export type PageMeta = { title: string; description: string; image: string; noindex?: boolean }
export const PAGE_META = pageMeta as Record<string, PageMeta>

type SEOProps = {
  path: string
  /** Only for pages not listed in pageMeta.json (e.g. the 404 page). */
  fallback?: PageMeta
  jsonLd?: object
}

// Per-page tags come from pageMeta.json, the same file the build script
// (scripts/prerender-meta.mjs) uses to bake them into static HTML for link
// previews, so the two can never disagree.
export default function SEO({ path, fallback, jsonLd }: SEOProps) {
  const meta = PAGE_META[path] ?? fallback
  if (!meta) return null
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const image = `${SITE_URL}${meta.image}`

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      {meta.noindex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="UPWRD Studio" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
