import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Features from "./sections/Features";
import Calculator from "./sections/Calculator";
import Pricing from "./sections/Pricing";
import ComparisonTable from "./sections/ComparisonTable";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import BetaProgram from "./pages/BetaProgram";
import BetaFeedback from "./pages/BetaFeedback";

function HomePage() {
  return (
    <>
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
    </>
  );
}

function SubPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-on-surface font-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/beta"
            element={
              <SubPageLayout>
                <BetaProgram />
              </SubPageLayout>
            }
          />
          <Route
            path="/beta/feedback"
            element={
              <SubPageLayout>
                <BetaFeedback />
              </SubPageLayout>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
