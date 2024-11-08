import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SuccessAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="rounded-full bg-green-500 p-2 inline-flex"
    >
      <Check className="w-4 h-4 text-white" />
    </motion.div>
  );
};