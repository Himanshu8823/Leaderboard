import { motion } from 'framer-motion';

// Reusable Card component with entry animation and customizable styles
const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      // Fade in and slide up animation on mount
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      // Default card styles + allow custom classes via className prop
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      {/* Render any child components or content inside the card */}
      {children}
    </motion.div>
  );
};

export default Card;