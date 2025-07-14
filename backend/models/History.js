const mongoose = require('mongoose');

// Schema to store user's points claim history
const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  pointsAwarded: {
    type: Number,
    required: true,
    min: [1, 'Points awarded must be at least 1'],
    max: [10, 'Points awarded cannot exceed 10']
  },
  claimedAt: {
    type: Date,
    default: Date.now // Timestamp of claim
  }
});

module.exports = mongoose.model('History', HistorySchema);