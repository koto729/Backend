const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const verify = require('./../controllers/verifyToken.js');


// Create a new message
router.post('/messages', verify, async (req, res) => {
  try {
    const { chatroomId, userId, message } = req.body;
    const newMessage = new Message({ chatroom: chatroomId, userId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Get all messages by chatroom
router.get('/messages/:chatroomId', verify, async (req, res) => {
  try {
    const chatroomId = req.params.chatroomId;
    const messages = await Message.find({ chatroom: chatroomId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

//delete messages by id
router.delete('/messages/:id', verify, async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
