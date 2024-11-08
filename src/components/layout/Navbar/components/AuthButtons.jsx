import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthButtons = ({ location }) => {
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
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
          to={isAuthPage ? '/#download' : '/signup'}
          className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          {isAuthPage ? 'Download' : 'Sign Up'}
        </Link>
      </motion.div>
    </>
  );
};

export default AuthButtons;