import { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import AnalyticsSection from '../sections/AnalyticsSection';
import EventsSection from '../sections/EventsSection';
import PageTransition from '../layout/PageTransition';

const Home = () => {
  // Handle smooth scrolling for hash links
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <PageTransition>
      <div className="overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
        <EventsSection />
      </div>
    </PageTransition>
  );
};

export default Home;