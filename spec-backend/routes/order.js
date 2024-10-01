
// const express = require('express');
// const { createOrder, getOrdersByUserId, getOrder, cancelOrder } = require('../controllers/order');

// // const Order = require('../models/order'); // Make sure the path to the model is correct
// const router = express.Router();

// // Route to create a new order
// router.post('/orders', createOrder);
// // Route to fetch order by ID
// router.get('/orders/:orderId', async (req, res) => {
//   const { orderId } = req.params; // Correctly extract orderId from URL parameters
//   console.log("Received orderId:", orderId); // Log for debugging

//   try {
//       const order = await Order.findById(orderId); // Use orderId directly
//       if (!order) {
//           return res.status(404).send('Order not found');
//       }
//       res.status(200).json(order);
//   } catch (error) {
//       console.error("Error fetching order:", error);
//       res.status(500).send('Internal Server Error');
//   }
// });

// router.get('/orders/user/:userId', getOrdersByUserId);

// // Route to cancel an order
// router.patch('/orders/:id/cancel', cancelOrder);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrdersByUserId,
    getOrder,
    cancelOrder
} = require('../controllers/order');

router.post('/orders', createOrder);
router.get('/orders/user/:userId',  getOrdersByUserId);
router.get('/orders/:orderId',  getOrder);
router.put('/orders/:orderId/cancel',  cancelOrder);

module.exports = router;




// const express = require('express');
// const {
//     createOrder,
//     getOrdersByUserId,
//     getOrder,
//     cancelOrder
// } = require('../controllers/order'); // Ensure the controller path is correct

// const router = express.Router();

// // Route to create a new order
// // router.post('/orders', createOrder);
// router.post('/orders', async (req, res) => {
//     try {
//       const { productId, quantity, totalPrice, customerDetails, userId, status } = req.body;
  
//       // Validate required fields
//       if (!productId || !quantity || !totalPrice || !customerDetails || !userId) {
//         return res.status(400).json({ success: false, message: 'Missing required fields' });
//       }
  
//       // Create the order (assuming you are using Mongoose)
//       const newOrder = await Order.create({
//         productId,
//         quantity,
//         totalPrice,
//         customerDetails,
//         userId,
//         status
//       });
  
//       res.status(201).json({ success: true, orderId: newOrder._id });
//     } catch (error) {
//       console.error('Error creating order:', error);
//       res.status(500).json({ success: false, message: 'Error creating order' });
//     }
//   });
  

// // Route to fetch order by ID
// router.get('/orders/:orderId', getOrder);

// // Route to fetch orders by user ID
// router.get('/orders/user/:userId', getOrdersByUserId);

// // Route to cancel an order
// router.patch('/orders/:id/cancel', cancelOrder);

// module.exports = router;
