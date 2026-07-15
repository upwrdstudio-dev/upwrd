import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import ScrollStatement from './components/ScrollStatement'
import Portfolio from './components/Portfolio'
import DesignWork from './components/DesignWork'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Services />
        <ScrollStatement />
        <Portfolio />
        <DesignWork />
        <Process />
        <Pricing />
      </main>
      <Contact />
    </div>
  )
}