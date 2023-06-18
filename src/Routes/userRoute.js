const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./../controllers/verifyToken.js');

// Route for registering a new user
const expectedSignUpCode = "ABC123";

// Route for registering a new user
router.post('/register', async (req, res) => {
  try {
    const { role, signUpCode, password, ...userData } = req.body;

    if (role === 'charityWorker') {
      // Check if the signUpCode is correct
      if (signUpCode !== expectedSignUpCode) {
        return res.status(400).json({ error: 'Invalid sign-up code' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const user = new User({ role, password: hashpassword,  ...userData });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).send('Email is not found');
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //token
    const token = jwt.sign({_id: user._id}, 'qweasd12zx', { expiresIn: '24h' });

    res.header('auth-token', token).send(token);
    //res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', verify, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me/:id', verify, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;