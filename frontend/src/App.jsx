import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useApi from './hooks/useApi';
import { getUsers } from './services/api';
import UserSelection from './components/users/UserSelection';
import AddUser from './components/users/AddUser';
import ClaimPoints from './components/points/ClaimPoints';
import Leaderboard from './components/leaderboard/Leaderboard';
import PointsHistory from './components/history/PointsHistory';
import Button from './components/ui/Button';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, error, request } = useApi();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await request(getUsers);
      setUsers(response.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh users after adding a new user
  const handleUserAdded = () => {
    fetchUsers();
  };

  // Refresh users after claiming points
  const handlePointsClaimed = () => {
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center text-indigo-600 mb-2"
        >
          Leaderboard System
        </motion.h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            {/* Loading spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center">
            <p>{error}</p>
            <Button 
              onClick={fetchUsers}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: User selection, add user, claim points */}
            <div className="lg:col-span-1 space-y-6">
              <UserSelection
                users={users}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
              
              <AddUser onUserAdded={handleUserAdded} />
              
              <ClaimPoints
                userId={selectedUser}
                users={users}
                onPointsClaimed={handlePointsClaimed}
              />
            </div>

            {/* Right Column: Leaderboard and points history */}
            <div className="lg:col-span-2 space-y-6">
              <Leaderboard users={users} />
              <PointsHistory />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;