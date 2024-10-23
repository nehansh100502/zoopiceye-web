const express = require('express');
const router = express.Router();
const uploadMultiple = require('../middleware/upload'); 

const {
  getSpectacles,
  getSpectacleById,
  addSpectacle,
  updateSpectacle,
  deleteSpectacle
} = require('../controllers/collection'); 

router.get('/spectacles', getSpectacles);

router.get('/spectacles/:id', getSpectacleById);

router.post('/spectacles', uploadMultiple, addSpectacle); 

router.put('/spectacles/:id', uploadMultiple, updateSpectacle);

router.put('/:id/colors', async (req, res) => {
  try {
    const { id } = req.params;
    const { colors } = req.body;  

    const spectacle = await Spectacle.findById(id);
    if (!spectacle) {
      return res.status(404).json({ message: 'Spectacle not found' });
    }
    spectacle.colors = colors;
    spectacle.stock = colors.reduce((total, color) => total + color.stock, 0);
    await spectacle.save();
    res.status(200).json({ message: 'Colors updated successfully', spectacle });
  } catch (error) {
    console.error('Error updating color stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/spectacles/:id', deleteSpectacle);

module.exports = router;
