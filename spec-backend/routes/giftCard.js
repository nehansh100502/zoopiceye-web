const express = require('express');
const router = express.Router();
const {applyGiftCard } = require('../controllers/giftCard');

router.post('/apply-gift-card', applyGiftCard);

module.exports = router;
