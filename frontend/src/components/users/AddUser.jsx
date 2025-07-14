import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addUser } from '../../services/api';
import useApi from '../../hooks/useApi';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const { loading, error, request } = useApi();

  // Handles form submission for adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await request(addUser, name);
      setName('');
      onUserAdded();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card>
        <motion.h2 
          className="text-xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Add New User
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* User name input */}
          <motion.input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            required
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileFocus={{ scale: 1.01 }}
          />
          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </motion.div>
        </form>

        {/* Error message animation */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="mt-2 text-red-500"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default AddUser;