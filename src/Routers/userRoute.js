const express = require('express');
const router = express.Router();
const User = require('./../models/user');
// Route for registering a new user
const expectedSignUpCode = "ABC123";

// Route for registering a new user
router.post('/register', async (req, res) => {
  try {
    const { role, signUpCode, ...userData } = req.body;

    if (role === 'charityWorker') {
      // Check if the signUpCode is correct
      if (signUpCode !== expectedSignUpCode) {
        return res.status(400).json({ error: 'Invalid sign-up code' });
      }
    }

    const user = new User({ role, ...userData });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;