const User = require('../models/User');

// Get all users sorted by points in descending order and assign rank
exports.getAllUsersWithRankings = async () => {
  const users = await User.find().sort({ points: -1 }).lean();
  return users.map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};

// Add a new user
exports.addUser = async (userData) => {
  const user = new User({
    name: userData.name
  });
  return await user.save();
};

// Award random points (1-10) to a user and return updated user and awarded points
exports.claimPoints = async (userId) => {
  const pointsAwarded = Math.floor(Math.random() * 10) + 1;
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: pointsAwarded } },
    { new: true }
  );
  if (!user) {
    throw new Error('User not found');
  }
  return { user, pointsAwarded };
};