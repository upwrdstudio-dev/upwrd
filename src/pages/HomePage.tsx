import Hero from '../components/Hero'
import Services from '../components/Services'
import ScrollStatement from '../components/ScrollStatement'
import PortfolioTeaser from '../components/PortfolioTeaser'
import DesignTeaser from '../components/DesignTeaser'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import { usePageReady } from '../hooks/usePageReady'

export default function HomePage() {
  usePageReady()
  return (
    <>
      <Hero />
      <Services />
      <ScrollStatement />
      <PortfolioTeaser />
      <DesignTeaser />
      <Process />
      <Pricing />
    </>
  )
}