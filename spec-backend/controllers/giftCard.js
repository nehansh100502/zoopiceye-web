const GiftCard = require('../models/giftCard');

// Apply Gift Card
const applyGiftCard = async (req, res) => {
    const { code, orderTotal } = req.body;
  
    try {
      const giftCard = await GiftCard.findOne({ code });
  
      if (!giftCard || !giftCard.isActive) {
        return res.status(404).json({ message: 'Gift card not found or inactive.' });
      }
  
      // Check expiration date
      if (giftCard.expirationDate && giftCard.expirationDate < new Date()) {
        return res.status(400).json({ message: 'Gift card has expired.' });
      }
  
      const availableBalance = giftCard.balance;
  
      // Check if the balance is enough for the order
      const amountToDeduct = Math.min(orderTotal, availableBalance);
  
      // Deduct the gift card balance
      giftCard.balance -= amountToDeduct;
      await giftCard.save();
  
      const finalPrice = orderTotal - amountToDeduct;
  
      res.status(200).json({ deductedAmount: amountToDeduct, finalPrice });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  module.exports = {
    applyGiftCard,
  };
  
