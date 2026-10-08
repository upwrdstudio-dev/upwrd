import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../data/site'

type SEOProps = {
  title: string
  description: string
  path: string
  jsonLd?: object
}

const SITE_NAME = 'UPWRD Studio'

export default function SEO({ title, description, path, jsonLd }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={`${SITE_URL}/brand/upwrd-og.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/brand/upwrd-og.png`} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
