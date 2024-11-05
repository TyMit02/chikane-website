import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Events', href: '#events' },
    { name: 'Download', href: '#download', isButton: true }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-primary-dark">
            Chikane
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={item.isButton ? 
                  "px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all" :
                  "text-gray-600 hover:text-accent transition-colors"}
              >
                {item.name}
              </a>
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
              <a
                key={item.name}
                href={item.href}
                className={`block ${item.isButton ? 
                  "px-6 py-2 bg-accent text-white rounded-lg text-center" :
                  "text-gray-600 hover:text-accent"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;