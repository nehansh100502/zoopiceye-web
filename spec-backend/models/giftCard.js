const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Unique gift card code
    balance: { type: Number, required: true }, 
    expirationDate: { type: Date }, 
    isActive: { type: Boolean, default: true }, 
  }, {
    timestamps: true,
  });
  
  const GiftCard = mongoose.model('GiftCard', giftCardSchema);
  
  module.exports = GiftCard;
  
