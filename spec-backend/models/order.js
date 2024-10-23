const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spectacle' },
      name: { type: String },
      sku: { type: String },
      price: { type: Number },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  giftCardAmount: { type: Number, default: 0 },
  status: { type: String, default: 'Pending' },

  // Add Shipping Address
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },

  // Add Payment Method
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'], 
    required: true,
  },

  estimatedDelivery: { type: Date },
  
}, { timestamps: true });  

module.exports = mongoose.model('Order', orderSchema);
