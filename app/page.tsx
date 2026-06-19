import About from './components/About'
import Contact from './components/Contact'
import ExpertFaculty from './components/ExpertFaculty'
import FAQSection from './components/FAQSection'
import Home from './components/Home'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Portfolio from './Portfolio/page'
import Services from './Services/page'

export default function page() {
  return (
    <div>
      <div id="Home">
        <Home />
      </div>
      <div>
        <Process />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <ExpertFaculty />
      
        <Testimonials />
     
      <div id="portfolio">
        <Portfolio />
      </div>
      <FAQSection />
      <div id="contact">
        <Contact />
      </div>
    </div>
  )
}
