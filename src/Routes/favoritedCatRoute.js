const express = require('express');
const router = express.Router();
const FavoritedCat = require('../models/favoritedCat');

// Create a new favorite cat 
router.post('/favorite', async (req, res) => {
  try {
    const favoritedCat = new FavoritedCat(req.body);

    await favoritedCat.save();

    res.status(200).json({ message: 'Cat favorited successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get favorite cats by user ID
router.get('/favorite/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const favoriteCats = await FavoritedCat.find({ userId });

    res.status(200).json(favoriteCats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get favorite cats' });
  }
});

// Get favorite cats by user ID and cat ID
router.get('/favorite/:userId/:catId', async (req, res) => {
  try {
    const { userId, catId } = req.params;

    const favoriteCats = await FavoritedCat.find({ userId: userId, catId: catId });

    res.status(200).json(favoriteCats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get favorite cats' });
  }
});

// Del favorite cat by user and cat ID
router.delete('/favorite/:userId/:catId', async (req, res) => {
  try {
    const { userId, catId } = req.params;
    const deletedCat = await FavoritedCat.findOneAndDelete({ userId: userId, catId: catId });

    if (!deletedCat) {
      return res.status(404).json({ error: 'Favorite cat not found' });
    }

    res.status(200).json({ message: 'Favorite cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete favorite cat' });
  }
});


module.exports = router;
