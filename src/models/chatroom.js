const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  center: {
    type: String,
    required: true
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Chatroom = new mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
