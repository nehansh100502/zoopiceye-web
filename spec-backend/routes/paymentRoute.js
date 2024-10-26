// import express from "express";
// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/paymentController.js";

// const router = express.Router();

// router.route("/checkout").post(checkout);

// router.route("/paymentverification").post(paymentVerification);

// export default router;

// routes/api.js
const express = require('express');
// const { getOrderById } = require('../controllers/order');
const { processPayment } = require('../controllers/paymentGateway');

const router = express.Router();

// Route to get order details
// router.get('/orders/:orderId', getOrderById);

// Route to process payment
router.post('/payments', processPayment);

module.exports = router;
