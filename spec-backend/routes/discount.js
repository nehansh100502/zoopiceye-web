const express = require('express');
const router = express.Router();
const { applyDiscountCode } = require('../controllers/discount');

// Apply discount code
router.post('/apply-discount', applyDiscountCode);

module.exports = router;
