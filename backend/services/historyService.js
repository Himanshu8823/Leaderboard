const History = require('../models/History');

// Create a new points claim history record
exports.createHistoryRecord = async (historyData) => {
  const history = new History(historyData);
  return await history.save();
};

// Get paginated points claim history with user details
exports.getHistory = async ({ limit = 10, page = 1 }) => {
  const skip = (page - 1) * limit;

  // Fetch paginated history records and total count in parallel
  const [records, total] = await Promise.all([
    History.find()
      .populate('userId', 'name')
      .sort({ claimedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    History.countDocuments()
  ]);

  return {
    records,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
};