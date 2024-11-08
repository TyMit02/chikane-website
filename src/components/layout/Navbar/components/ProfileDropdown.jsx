import { useState, useEffect, useRef } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-5 h-5 text-accent" />
          )}
        </div>
        <span className="font-medium">{user.displayName || 'User'}</span>
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
              to="/dashboard/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={onLogout}
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

export default ProfileDropdown;