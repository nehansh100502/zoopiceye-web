// import { instance } from "../server.js";
// import crypto from "crypto";
// import { Payment } from "../models/paymentModel.js";

// export const checkout = async (req, res) => {
//   const options = {
//     amount: Number(req.body.amount * 100),
//     currency: "INR",
//   };
//   const order = await instance.orders.create(options);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// };

// export const paymentVerification = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     // Database comes here

//     await Payment.create({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     });

//     // res.redirect(
//     //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     // );
//   } else {
//     res.status(400).json({
//       success: false,
//     });
//   }
// };

// controllers/paymentsController.js
const Order = require('../models/order');

// Process payment
exports.processPayment = async (req, res) => {
  const { orderId, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Here, you would integrate the payment gateway logic
    // For now, we will assume the payment is successful.

    // Mark the order as paid
    order.isPaid = true;
    order.paymentMethod = paymentMethod;
    await order.save();

    res.status(200).json({ success: true, message: 'Payment processed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment processing failed', error: error.message });
  }
};
