import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { claimPoints } from '../../services/api';
import useApi from '../../hooks/useApi';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FaGift, FaCheckCircle, FaStar } from 'react-icons/fa';

const ClaimPoints = ({ userId, users, onPointsClaimed }) => {
  const [lastClaim, setLastClaim] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { loading, error, request } = useApi();

  // Handles the process of claiming points for the selected user
  const handleClaimPoints = async () => {
    if (!userId) return;

    try {
      const response = await request(claimPoints, userId);
      const userName = users.find(u => u._id === userId).name;

      setLastClaim({
        points: response?.data?.pointsAwarded,
        name: userName
      });
      setShowCelebration(true);

      // Wait for celebration to finish, then call parent
      setTimeout(() => {
        setShowCelebration(false);
        onPointsClaimed();
      }, 3000);

    } catch (err) {
      console.error('Error claiming points:', err);
    }
  };

  // Find the currently selected user object
  const selectedUser = users.find(user => user._id === userId);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Claim Points</h2>
      <div className="space-y-4 relative">
        <Button
          onClick={handleClaimPoints}
          disabled={!userId || loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaGift />
              </motion.span>
              Claiming...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaGift />
              Claim Points
            </span>
          )}
        </Button>

        {selectedUser && (
          <p className="text-gray-700">
            Current points: <span className="font-bold">{selectedUser.points}</span>
          </p>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <AnimatePresence>
          {showCelebration && lastClaim && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative z-10 text-center pointer-events-auto"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-5xl text-green-500 mb-4"
                >
                  <FaCheckCircle />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Congratulations!
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  You received <span className="font-bold text-indigo-600">
                    {lastClaim.points} points
                  </span>
                </p>

                {/* Confetti stars animation */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400 text-xl"
                    initial={{
                      opacity: 1,
                      y: 0,
                      x: 0
                    }}
                    animate={{
                      opacity: 0,
                      y: -100,
                      x: Math.random() * 200 - 100
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1
                    }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <FaStar />
                  </motion.div>
                ))}
              </motion.div>

              {/* Celebration overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-30"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ClaimPoints;