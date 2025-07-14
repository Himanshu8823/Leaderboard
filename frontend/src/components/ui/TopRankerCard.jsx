import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import { GiLaurelsTrophy } from 'react-icons/gi';

// TopRankerCard displays a special card for the top 3 users on the leaderboard
const TopRankerCard = ({ user, rank }) => {
  // Configuration for each rank (1st, 2nd, 3rd)
  const rankData = [
    { // 1st Place
      icon: <FaTrophy className="text-yellow-400" size={48} />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      cardSize: 'w-full max-w-md h-64', 
      iconSize: 'w-24 h-24',
      iconAnimation: {
        y: [0, -15, 0],
        rotate: [0, -15, 15, 0],
        scale: [1, 1.1, 1]
      },
      particles: true, // Show winner particles for 1st place
      pulse: true      // Card pulses for 1st place
    },
    { // 2nd Place
      icon: <FaMedal className="text-gray-400" size={36} />,
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      cardSize: 'w-full max-w-sm h-56', 
      iconSize: 'w-20 h-20',
      iconAnimation: {
        y: [0, -10, 0],
        scale: [1, 1.05, 1]
      }
    },
    { // 3rd Place
      icon: <FaAward className="text-amber-500" size={32} />,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      cardSize: 'w-full max-w-xs h-52', 
      iconSize: 'w-16 h-16',
      iconAnimation: {
        y: [0, -5, 0]
      }
    }
  ];

  // Destructure the config for the current rank
  const { 
    icon, 
    bg, 
    border, 
    text, 
    cardSize, 
    iconSize, 
    iconAnimation, 
    particles,
    pulse
  } = rankData[rank - 1];

  // Titles for each rank
  const rankTitle = ['CHAMPION', '2nd PLACE', '3rd PLACE'][rank - 1];

  return (
    <motion.div
      // Card entry animation and pulse for 1st place
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: pulse ? [1, 1.02, 1] : 1
      }}
      transition={{ 
        duration: 0.3,
        repeat: pulse ? Infinity : 0,
        repeatDelay: pulse ? 2 : 0
      }}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col items-center p-6 ${bg} border ${border} rounded-xl shadow-lg ${cardSize} mx-auto mb-4 md:mb-0 relative overflow-hidden`}
    >
      {/* Winner animation particles for 1st place */}
      {particles && (
        <>
          {/* Left yellow particle */}
          <motion.div 
            className="absolute top-4 left-6 w-3 h-3 bg-yellow-400 rounded-full"
            animate={{
              y: [0, -30, -60, -90],
              x: [0, 8, -8, 0],
              opacity: [1, 1, 1, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
          {/* Right indigo particle */}
          <motion.div 
            className="absolute top-8 right-8 w-2 h-2 bg-indigo-400 rounded-full"
            animate={{
              y: [0, -20, -40, -60],
              x: [0, -10, 10, 0],
              opacity: [1, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </>
      )}

      {/* Animated rank icon (trophy/medal/award) */}
      <motion.div
        animate={iconAnimation}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        className={`${iconSize} rounded-full ${bg} border-2 ${border} flex items-center justify-center mb-4`}
      >
        {icon}
      </motion.div>

      {/* User name */}
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{user.name}</h3>
      {/* Rank title (e.g., CHAMPION) */}
      <p className={`text-lg font-semibold ${text} mb-4`}>{rankTitle}</p>
      {/* Points with laurel icon */}
      <div className="flex items-center">
        <GiLaurelsTrophy className={`mr-2 ${text}`} size={24} />
        <p className={`text-3xl font-bold ${text}`}>{user.points} pts</p>
      </div>

      {/* Rank badge in the top-right corner */}
      <div className={`absolute top-4 right-4 w-10 h-10 rounded-full ${rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-400' : 'bg-amber-500'} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
        {rank}
      </div>
    </motion.div>
  );
};

export default TopRankerCard;