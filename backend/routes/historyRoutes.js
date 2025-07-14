const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Route to get paginated points claim history
router.route('/')
  .get(historyController.getHistory);

module.exports = router;