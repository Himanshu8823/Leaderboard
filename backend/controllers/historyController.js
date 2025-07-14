const historyService = require('../services/historyService');
const asyncHandler = require('../utils/asyncHandler');

// Get points claim history with pagination
exports.getHistory = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  // Fetch paginated history records
  const history = await historyService.getHistory({ page, limit });

  res.status(200).json({
    success: true,
    pagination: {
      total: history.total,
      pages: history.pages,
      page: history.currentPage
    },
    data: history.records
  });
});