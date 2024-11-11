import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Users, Clock, Settings, Bell, Filter,
  Plus, Search, ChevronLeft, ChevronRight, Timer,
  BarChart2, Camera, User
} from 'lucide-react';
import { useAuth } from '../../App';

// Navigation Item Component
const NavItem = ({ icon: Icon, label, path, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);

  return (
    <Link
      to={path}
      className={`flex items-center gap-4 p-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-accent/10 text-accent' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

// User Profile Component
const UserProfile = ({ user }) => (
  <div className="p-4 border-t">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
        ) : (
          <User className="w-6 h-6 text-accent" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user?.displayName || 'User'}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {user?.email || 'No email'}
        </p>
      </div>
    </div>
  </div>
);

const DashboardLayout = () => {  // Removed children prop
  console.log("DashboardLayout rendering"); // Add this line

  const { user, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

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

  const menuItems = [
    { icon: Calendar, label: 'Events', path: '/dashboard/events' },
    { icon: Users, label: 'Participants', path: '/dashboard/participants' },
    { icon: Timer, label: 'Timing', path: '/dashboard/timing' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Camera, label: 'Media', path: '/dashboard/media' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const currentSection = menuItems.find(item => 
    location.pathname.startsWith(item.path))?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: sidebarCollapsed ? '4rem' : '16rem' }}
        className="bg-white shadow-lg flex flex-col"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              Chikane
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-between py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                collapsed={sidebarCollapsed}
              />
            ))}
          </nav>

          {/* User Profile */}
          {!sidebarCollapsed && <UserProfile user={user} />}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {currentSection}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center md:hidden"
            >
              <User className="w-5 h-5 text-accent" />
            </motion.div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet /> {/* This is the key change */}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;