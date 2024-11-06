import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import AnalyticsSection from "./components/sections/AnalyticsSection";
import EventsSection from "./components/sections/EventsSection";
import Features from './components/pages/Features';
import Analytics from './components/pages/Analytics';
import Events from './components/pages/Events';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';

// Wrap each page with animations
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Home page component with all sections
const HomePage = () => (
  <PageWrapper>
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <AnalyticsSection />
      <EventsSection />
    </div>
  </PageWrapper>
);

// AnimatedRoutes component to handle route transitions
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />  {/* Changed from Home to HomePage */}
        <Route path="/features" element={<Features />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} /> 
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;