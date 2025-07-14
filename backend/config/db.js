const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    await initializeDefaultUsers(); // Ensure default users exist
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

const initializeDefaultUsers = async () => {
  const User = require('../models/User');
  const count = await User.countDocuments();
  
  if (count === 0) {
    // List of default users to be created if none exist
    const defaultUsers = [
      { name: 'Rahul' },
      { name: 'Kamal' },
      { name: 'Sanak' },
      { name: 'Mahesh' },
      { name: 'Himanshu' },
      { name: 'Neha' },
      { name: 'Vaishnavi' },
      { name: 'Lokesh' },
      { name: 'Ankit' },
      { name: 'Kunal' }
    ];
    await User.insertMany(defaultUsers);
    console.log('Default users created');
  }
};

module.exports = connectDB;