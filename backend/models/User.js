const mongoose = require('mongoose');

// User schema definition
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [45, 'Name cannot be more than 45 characters']
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique user names
UserSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);