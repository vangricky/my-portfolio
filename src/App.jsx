import Hero from './components/Hero'
import Nav from './components/Nav'
import { About, Contact, Resume, Ticker, Toolkit, Work } from './components/Sections'
import { useSmoothScroll } from './lib/motion'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Toolkit />
        <Work />
        <Resume />
        <Contact />
      </main>
    </>
  )
}
