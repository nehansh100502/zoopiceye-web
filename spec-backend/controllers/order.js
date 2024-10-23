const jwt = require('jsonwebtoken');
const Order = require('../models/order');
const User = require('../models/user');
const mongoose = require('mongoose');

// / Slack Webhook URL
const webhookUrl = 'https://hooks.slack.com/services/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';

// Slack notification function
const sendSlackNotification = async (orderDetails) => {
  const message = {
    text: `New Order Received:\n*Order ID:* ${orderDetails._id}\n*Total:* $${orderDetails.totalPrice}`
  };

  try {
    await axios.post(webhookUrl, message);
    console.log("Slack notification sent");
  } catch (error) {
    console.error("Error sending Slack notification: ", error);
  }
};

// const createOrder = async (req, res) => {
//     try {
//         const { userId, items, totalAmount, discountAmount, giftCardAmount, shippingAddress, paymentMethod } = req.body;

//         // Calculate estimated delivery date (7 days from today)
//         const estimatedDelivery = new Date();
//         estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

//         // Get the current date for the order creation
//         const createdAt = new Date();

//         // Create a new order document with the creation date
//         const newOrder = new Order({
//             userId,
//             items,
//             totalAmount,
//             discountAmount: discountAmount || 0,
//             giftCardAmount: giftCardAmount || 0,
//             status: 'Pending', // Initial status
//             shippingAddress,
//             paymentMethod,
//             estimatedDelivery,
//             createdAt, // Save the creation date
//         });

//         // Save the order to the database
//         const savedOrder = await newOrder.save();

//         // Find the user and add the order to their orders array
//         const user = await User.findById(userId);
        
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         // Ensure the orders array exists
//         if (!user.orders) {
//             user.orders = []; // Initialize the orders array if it doesn't exist
//         }

//         user.orders.push(savedOrder._id); // Add the new order ID to the user's orders array
//         await user.save(); // Save the updated user document

//     // Send Slack notification with order details
//     await sendSlackNotification(savedOrder);

//         // Send a success response with the saved order details
//         return res.status(201).json({
//             success: true,
//             message: 'Order created successfully',
//             order: savedOrder,
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         return res.status(500).json({ success: false, message: 'Failed to create order', error });
//     }
// };

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, discountAmount, giftCardAmount, shippingAddress, paymentMethod } = req.body;

        // Calculate estimated delivery date (7 days from today)
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

        // Get the current date for the order creation
        const createdAt = new Date();
        const orderDate = createdAt; // You can also assign a separate `orderDate` if you want

        // Create a new order document with the creation date
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            discountAmount: discountAmount || 0,
            giftCardAmount: giftCardAmount || 0,
            status: 'Pending', // Initial status
            shippingAddress,
            paymentMethod,
            estimatedDelivery,
            createdAt, // Save the creation date
            orderDate,  // Explicitly add orderDate if needed
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Find the user and add the order to their orders array
        const user = await User.findById(userId);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Ensure the orders array exists
        if (!user.orders) {
            user.orders = []; // Initialize the orders array if it doesn't exist
        }

        user.orders.push(savedOrder._id); // Add the new order ID to the user's orders array
        await user.save(); // Save the updated user document

        // Send Slack notification with order details
        await sendSlackNotification(savedOrder);

        // Send a success response with the saved order details
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: savedOrder,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ success: false, message: 'Failed to create order', error });
    }
};
const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try {
        // Find orders by userId and populate the 'items.productId' field to get the product details including SKU
        const orders = await Order.find({ userId: userId })
            .populate('items.productId', 'name sku') // Populate both 'name' and 'sku' fields
            .sort({ createdAt: -1 }); // Sort by creation date (or orderDate if used)

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};


// const getOrdersByUserId = async (req, res) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({ message: 'Invalid User ID' });
//     }

//     try {
//         // Find orders by userId and populate the 'items.productId' field to get the product details including SKU
//         const orders = await Order.find({ userId: userId })
//             .populate('items.productId', 'name sku') // Populate both 'name' and 'sku' fields
//             .sort({ orderDate: -1 }); // Sort by order date in descending order

//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: 'No orders found for this user' });
//         }

//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };

  
const getOrder = async (req, res) => {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid order ID' });
    }

    try {
        // Populate the 'userId' and 'items.productId' with 'sku' and 'name'
        const order = await Order.findById(orderId)
            .populate('userId')
            .populate('items.productId', 'name sku'); // Populate 'name' and 'sku' fields

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel an order
const cancelOrder = async (req, res) => {
    const { id } = req.params; // Ensure this matches the route parameter name
    try {
        const order = await Order.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrder,
    cancelOrder
};

