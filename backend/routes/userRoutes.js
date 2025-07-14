const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users and add a new user
router.route('/')
  .get(userController.getUsers)
  .post(userController.addUser);

// Claim random points for a user
router.route('/claim')
  .post(userController.claimPoints);

module.exports = router;