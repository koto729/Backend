const express = require('express');
const router = express.Router();
const Cat = require('./../models/cat');
const verify = require('./../controllers/verifyToken.js');

//add a new cat
router.post('/addcat', async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get details of all cat
router.get('/cats', async (req, res) => {
  try {
    const cat = await Cat.find();
    res.json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update the details of  cat by ID
router.put('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a specific cat by its ID
router.delete('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.json({ message: 'Cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get cats by breed
router.get('/cats/breed/:breed', async (req, res) => {
  try {
    const breed = decodeURIComponent(req.params.breed);
    const cats = await Cat.find({ breed });
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get cats by center
router.get('/cats/center/:center', async (req, res) => {
  try {
    const center = decodeURIComponent(req.params.center);
    const cats = await Cat.find({ center });
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
