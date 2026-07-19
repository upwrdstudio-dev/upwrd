import Hero from '../components/Hero'
import Services from '../components/Services'
import Studio from '../components/Studio'
import ScrollStatement from '../components/ScrollStatement'
import PortfolioTeaser from '../components/PortfolioTeaser'
import DesignTeaser from '../components/DesignTeaser'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import SEO from '../components/SEO'
import { usePageReady } from '../hooks/usePageReady'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'UPWRD Studio',
  description:
    'UPWRD Studio helps Malaysian SMEs grow through websites, AI automation, and design, built as one connected system.',
  url: 'https://upwrd.vercel.app',
  email: 'upwrdstudio@gmail.com',
  areaServed: {
    '@type': 'Country',
    name: 'Malaysia',
  },
  sameAs: ['https://instagram.com/upwrdstudio'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design' } },
  ],
}

export default function HomePage() {
  usePageReady()
  return (
    <>
      <SEO
        title="Websites, AI Automation & Design for Malaysian SMEs"
        description="UPWRD Studio helps Malaysian SMEs grow through websites, AI automation, and design — built as one connected system, not sold as separate favors."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <Services />
      <Studio />
      <ScrollStatement />
      <PortfolioTeaser />
      <DesignTeaser />
      <Process />
      <Pricing />
      <FAQ />
    </>
  )
}