
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export the router
module.exports = router;
