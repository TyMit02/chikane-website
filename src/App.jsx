import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardLayout from "@/components/layout/DashboardLayout";

// Dashboard Components
import DashboardHome from '@/components/dashboard/DashboardHome';
console.log('DashboardHome component:', DashboardHome); // Add this line

import EventsManagement from '@/components/dashboard/events/EventsManagement';
import EventCreation from '@/components/dashboard/events/create/EventCreation';
import EventTesting from '@/components/dashboard/events/EventTesting';

// Auth Pages
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';

// Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email);
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

  console.log('ProtectedRoute - User:', user?.email, 'Loading:', loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// App Routes Component
function AppRoutes() {
  const location = useLocation();

  // Debug route changes
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="events" element={<EventsManagement />} />
          <Route path="events/create" element={<EventCreation />} />
          <Route path="events/test" element={<EventTesting />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-lg text-gray-600">Page Not Found</p>
              </div>
            </div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

// Main App Component
function App() {
  console.log("App rendering");

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