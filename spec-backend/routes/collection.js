
// const express = require('express');
// const router = express.Router();
// const {
//   getSpectacles,
//   getSpectacleById,
//   addSpectacle,
//   updateSpectacle,
//   deleteSpectacle
// } = require('../controllers/collection');

// // Get all spectacles with filters
// router.get('/spectacles', getSpectacles);

// // Get a specific spectacle by ID
// router.get('/spectacles/:id', getSpectacleById);

// // Add a new spectacle
// router.post('/spectacles', addSpectacle);

// // Update a spectacle by ID
// router.put('/spectacles/:id', updateSpectacle);

// // Delete a spectacle by ID
// router.delete('/spectacles/:id', deleteSpectacle);

// module.exports = router;

const express = require('express');
const router = express.Router();
const uploadMultiple = require('../middleware/upload'); // Ensure correct path

const {
  getSpectacles,
  getSpectacleById,
  addSpectacle,
  updateSpectacle,
  deleteSpectacle
} = require('../controllers/collection'); // Ensure all functions are properly exported and imported

// Route to get all spectacles
router.get('/spectacles', getSpectacles);

// Route to get a specific spectacle by ID
router.get('/spectacles/:id', getSpectacleById);

// Route to add a new spectacle (with image upload)
router.post('/spectacles', uploadMultiple, addSpectacle); 

// Route to update a spectacle by ID (with optional image upload)
router.put('/spectacles/:id', uploadMultiple, updateSpectacle);

// Add or update color stock for a spectacle
router.put('/:id/colors', async (req, res) => {
  try {
    const { id } = req.params;
    const { colors } = req.body;  // Expecting an array of colors with stock

    // Find the spectacle by id
    const spectacle = await Spectacle.findById(id);
    if (!spectacle) {
      return res.status(404).json({ message: 'Spectacle not found' });
    }

    // Update colors with stock
    spectacle.colors = colors;

    // Optionally, update total stock (sum of all color stocks)
    spectacle.stock = colors.reduce((total, color) => total + color.stock, 0);

    await spectacle.save();

    res.status(200).json({ message: 'Colors updated successfully', spectacle });
  } catch (error) {
    console.error('Error updating color stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a spectacle by ID
router.delete('/spectacles/:id', deleteSpectacle);

module.exports = router;
