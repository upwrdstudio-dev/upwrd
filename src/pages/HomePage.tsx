import SEO from '../components/SEO'
import Hero from '../components/home/Hero'
import Ticker from '../components/home/Ticker'
import Manifesto from '../components/home/Manifesto'
import Services from '../components/home/Services'
import Work from '../components/home/Work'
import DesignShowcase from '../components/home/DesignShowcase'
import Process from '../components/home/Process'
import Pricing from '../components/home/Pricing'
import FAQ, { faqs } from '../components/home/FAQ'
import { CONTACT, SITE_URL } from '../data/site'
import { servicePages } from '../data/servicePages'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Tells Google the site's name, so brand searches show "UPWRD Studio".
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'UPWRD Studio',
      alternateName: ['UPWRD', 'Upwrd Studio', 'upwrdstudio.com'],
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#studio` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#studio`,
      name: 'UPWRD Studio',
      alternateName: 'UPWRD',
      description:
        'UPWRD Studio designs and builds websites and social media design for Malaysian small businesses — made to work together.',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/upwrd-app-icon.png`,
      image: `${SITE_URL}/brand/upwrd-og.png`,
      email: CONTACT.email,
      telephone: `+${CONTACT.whatsapp}`,
      priceRange: 'RM 150 – RM 6,500+',
      foundingDate: '2025',
      knowsLanguage: ['en', 'ms', 'zh', 'yue'],
      // Service-area business: city only, no street address.
      address: { '@type': 'PostalAddress', addressLocality: 'Kuala Lumpur', addressCountry: 'MY' },
      areaServed: [
        { '@type': 'City', name: 'Kuala Lumpur' },
        { '@type': 'State', name: 'Selangor' },
        { '@type': 'Country', name: 'Malaysia' },
      ],
      sameAs: [CONTACT.instagramUrl, CONTACT.googleProfileUrl],
      makesOffer: servicePages.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.label, url: `${SITE_URL}/services/${s.slug}` },
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <SEO path="/" jsonLd={jsonLd} />
      <Hero />
      <Ticker />
      <Manifesto />
      <Services />
      <Work />
      <DesignShowcase />
      <Process />
      <Pricing />
      <FAQ />
    </>
  )
}
