const mongoose = require('mongoose');
const validator = require('validator');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Invalid image URL'
    }
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  microchipNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isNumeric,
      message: 'Microchip number must be numeric'
    }
  },
  birthday: {
    type: Date,
    required: true
  },
  center: {
    type: String,
    required: true,
    trim: true
  },
  introduction: {
    type: String,
    required: true
  }
});

const Cat = new mongoose.model('Cat', catSchema);

module.exports = Cat;