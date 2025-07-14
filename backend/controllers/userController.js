const userService = require('../services/userService');
const historyService = require('../services/historyService');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// Get all users with rankings
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await userService.getAllUsersWithRankings();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// Add a new user
exports.addUser = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorResponse('Please provide a name', 400));
  }
  const user = await userService.addUser({ name });
  res.status(201).json({
    success: true,
    data: user
  });
});

// Claim random points for user
exports.claimPoints = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return next(new ErrorResponse('Please provide a user ID', 400));
  }
  // Award points and create history record
  const { user, pointsAwarded } = await userService.claimPoints(userId);
  await historyService.createHistoryRecord({
    userId,
    pointsAwarded
  });
  res.status(200).json({
    success: true,
    data: {
      user,
      pointsAwarded
    }
  });
});