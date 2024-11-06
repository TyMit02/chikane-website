import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Privacy Policy', to: '/privacy' },
    { name: 'Contact us', to: '/contact' },
    { name: 'Features', to: '/#features', isHash: true },
    { name: 'Analytics', to: '/#analytics', isHash: true },
    { name: 'Events', to: '/#events', isHash: true },
    { name: 'Download', to: '/#download', isButton: true, isHash: true }
  ];

  const handleNavClick = (item) => {
    if (item.isHash) {
      if (location.pathname !== '/') {
        window.location.href = item.to;
        return;
      }
      
      const element = document.querySelector(item.to.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with hover animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-2xl font-bold text-primary-dark">
              Chikane
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isHash ? (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.to}
                  className={item.isButton ?
                    "px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all" :
                    "text-gray-600 hover:text-accent transition-colors"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                >
                  {item.name}
                </motion.a>
              ) : (
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
              )
            ))}
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

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed left-0 right-0 bg-white/90 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.isHash ? (
                      <a
                        href={item.to}
                        className={`block ${item.isButton ?
                          "px-6 py-2 bg-accent text-white rounded-lg text-center" :
                          "text-gray-600 hover:text-accent"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item);
                        }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={`block text-gray-600 hover:text-accent ${
                          location.pathname === item.to ? 'text-accent' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;