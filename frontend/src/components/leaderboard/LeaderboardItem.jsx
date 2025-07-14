import { motion } from 'framer-motion';

const LeaderboardItem = ({ user, rank }) => {
  const rankColors = [
    'bg-yellow-400',
    'bg-gray-400',  
    'bg-amber-600', 
    'bg-indigo-500' 
  ];

  const colorClass = rankColors[Math.min(rank - 1, 3)];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${colorClass}`}>
          {rank}
        </div>
        <div className="font-medium">{user.name}</div>
      </div>
      <div className="font-bold text-indigo-600">{user.points} pts</div>
    </motion.div>
  );
};

export default LeaderboardItem;