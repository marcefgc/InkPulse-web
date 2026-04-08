import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import Features from './sections/Features'
import Calculator from './sections/Calculator'
import Pricing from './sections/Pricing'
import ComparisonTable from './sections/ComparisonTable'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Calculator />
        <Pricing />
        <ComparisonTable />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
