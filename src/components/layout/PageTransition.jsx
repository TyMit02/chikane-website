import { motion } from 'framer-motion';

// Predefined transition variants for different types of pages
const pageTransitions = {
  default: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  }
};

const PageTransition = ({ 
  children, 
  type = 'default', 
  duration = 0.3,
  className = ''
}) => {
  const selectedTransition = pageTransitions[type] || pageTransitions.default;

  return (
    <motion.div
      initial={selectedTransition.initial}
      animate={selectedTransition.animate}
      exit={selectedTransition.exit}
      transition={{
        duration,
        ease: "easeInOut"
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;