import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import DesignWork from './components/DesignWork'
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
        <DesignWork />
        <Process />
        <Pricing />
      </main>
      <Contact />
    </div>
  )
}
