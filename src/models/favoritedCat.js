const mongoose = require('mongoose');

const favoritedCatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const FavoritedCat = new mongoose.model('FavoritedCat', favoritedCatSchema);

module.exports = FavoritedCat;
