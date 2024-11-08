import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

// Existing imports
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

// New imports
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  // You'll get this from your Firebase Console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

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

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
        <Route path="events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        
        {/* Auth Routes */}
        <Route path="login" element={
          user ? <Navigate to="/dashboard" replace /> : <PageWrapper><Login /></PageWrapper>
        } />
        <Route path="signup" element={
          user ? <Navigate to="/dashboard" replace /> : <PageWrapper><SignUp /></PageWrapper>
        } />

        {/* Protected Dashboard Routes */}
        <Route path="dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={
          <PageWrapper>
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-2xl">404 - Page Not Found</h1>
            </div>
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;