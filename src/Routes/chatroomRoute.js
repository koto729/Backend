const express = require('express');
const router = express.Router();
const Chatroom = require('../models/chatroom');
const verify = require('./../controllers/verifyToken.js');

// Create a new chatroom
router.post('/addchatrooms', verify, async (req, res) => {
  try {
    const chatroom = new Chatroom(req.body);
    await chatroom.save();
    res.status(201).json(chatroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all chatrooms
router.get('/chatrooms', verify, async (req, res) => {
  try {
    const chatrooms = await Chatroom.find();
    res.status(200).json(chatrooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chatrooms' });
  }
});

// Get a chatroom by ID
router.get('/chatrooms/:id', verify, async (req, res) => {
  try {
    const chatroomId = req.params.id;
    const chatroom = await Chatroom.findById(chatroomId);
    if (!chatroom) {
      return res.status(404).json({ error: 'Chatroom not found' });
    }
    res.status(200).json(chatroom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chatroom' });
  }
});

// Get a chatroom by userID
router.get('/chatrooms/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const chatroom = await Chatroom.find({ userId });
    if (!chatroom) {
      return res.status(404).json({ error: 'Chatroom not found' });
    }
    res.status(200).json(chatroom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chatroom' });
  }
});


module.exports = router;
