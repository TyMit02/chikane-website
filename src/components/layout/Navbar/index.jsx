import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../App';
import { auth } from '../../../config/firebase';
import logo from '@/assets/logo.png';

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-accent"
      >
        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-5 h-5 text-accent" />
          )}
        </div>
        <span className="font-medium">{user?.displayName || 'User'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-100"
          >
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Move dashboard check after hooks
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  const menuItems = [
    { name: 'Features', to: '/features' },
    { name: 'Analytics', to: '/analytics' },
    { name: 'Events', to: '/events' },
    { name: 'Contact', to: '/contact' },
    { name: 'Privacy', to: '/privacy' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Chikane Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-2xl font-bold text-primary-dark">
                Chikane
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={`text-gray-600 hover:text-accent transition-colors ${
                    location.pathname === item.to ? 'text-accent' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-accent transition-colors"
                >
                  Login
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-600 hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed left-0 right-0 bg-white/90 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      className={`block text-gray-600 hover:text-accent ${
                        location.pathname === item.to ? 'text-accent' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-gray-600 hover:text-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-accent"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-gray-600 hover:text-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-6 py-2 bg-accent text-white rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;