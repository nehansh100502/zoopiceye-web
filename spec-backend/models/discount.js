const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique discount code
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true }, // Percentage or fixed discount
  discountValue: { type: Number, required: true }, // Value of the discount
  expirationDate: { type: Date }, // Optional expiration date
  minPurchaseAmount: { type: Number, default: 0 }, // Optional minimum purchase amount
  maxDiscountAmount: { type: Number }, // Optional max discount value
  usageLimit: { type: Number, default: 1 }, // Optional number of times a code can be used
  timesUsed: { type: Number, default: 0 }, // Track how many times a code has been used
}, {
  timestamps: true,
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;
