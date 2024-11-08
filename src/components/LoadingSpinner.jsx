import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-accent border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};
