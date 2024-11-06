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

// Main content component with routes
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
        <Route path="events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><div>404 Not Found</div></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;