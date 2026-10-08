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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'UPWRD Studio',
      description:
        'UPWRD Studio helps Malaysian SMEs grow through websites, AI automation, and design, built as one connected system.',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/upwrd-app-icon.png`,
      email: CONTACT.email,
      areaServed: { '@type': 'Country', name: 'Malaysia' },
      sameAs: [CONTACT.instagramUrl],
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Design' } },
      ],
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
      <SEO
        title="Websites, AI Automation & Design for Malaysian SMEs"
        description="UPWRD Studio helps Malaysian SMEs grow through websites, AI automation, and design — built as one connected system, not sold as separate favours."
        path="/"
        jsonLd={jsonLd}
      />
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
