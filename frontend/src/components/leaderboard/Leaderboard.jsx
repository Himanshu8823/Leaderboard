import LeaderboardItem from './LeaderboardItem';
import TopRankerCard from '../ui/TopRankerCard';
import Card from '../ui/Card';

const Leaderboard = ({ users }) => {
  // Separate top 3 users and the rest
  const topRankers = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      
      {/* Top 3 rankers in a row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topRankers.map((user, index) => (
          <TopRankerCard 
            key={user._id} 
            user={user} 
            rank={index + 1} 
          />
        ))}
      </div>
      
      {/* Remaining users in list */}
      <div className="space-y-3">
        {remainingUsers.map((user, index) => (
          <LeaderboardItem 
            key={user._id} 
            user={user} 
            rank={index + 4}
          />
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;