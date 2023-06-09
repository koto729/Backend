const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['charityWorker', 'public']
  },
  // Additional fields for charity workers
  centerLocation: {
    type: String,
    trim: true
  },
  signUpCode: {
    type: String,
    trim: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
