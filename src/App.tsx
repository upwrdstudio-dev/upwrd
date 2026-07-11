import { SpeedInsights } from '@vercel/speed-insights/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
      </main>
      <Contact />
      <SpeedInsights />
    </div>
  )
}
