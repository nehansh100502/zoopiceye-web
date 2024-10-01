const express = require('express');
const { getOffers, createOffer } = require('../controllers/offer');

const router = express.Router();

// Route to get all offers
router.get('/getOffers', getOffers);

// Route to create a new offer
router.post('/createOffer', createOffer);

module.exports = router;
