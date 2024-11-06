import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
    // For hash links on home page
    { name: 'Features', to: '/#features', isHash: true },
    { name: 'Analytics', to: '/#analytics', isHash: true },
    { name: 'Events', to: '/#events', isHash: true },
    { name: 'Download', to: '/#download', isButton: true, isHash: true }
  ];

  const handleNavClick = (item) => {
    if (item.isHash) {
      // If we're not on the home page, we need to navigate home first
      if (location.pathname !== '/') {
        window.location.href = item.to;
        return;
      }
      
      // Handle smooth scrolling for hash links on home page
      const element = document.querySelector(item.to.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-dark">
            Chikane
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isHash ? (
                <a
                  key={item.name}
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
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-gray-600 hover:text-accent transition-colors ${
                    location.pathname === item.to ? 'text-accent' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden
          fixed left-0 right-0
          bg-white/90 backdrop-blur-md
          transition-all duration-300
          ${isMenuOpen ? 'top-20 opacity-100' : '-top-full opacity-0'}
        `}>
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              item.isHash ? (
                <a
                  key={item.name}
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
                  key={item.name}
                  to={item.to}
                  className={`block text-gray-600 hover:text-accent ${
                    location.pathname === item.to ? 'text-accent' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;