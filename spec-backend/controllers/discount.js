const DiscountCode = require('../models/discount');


// Apply Discount Code
const applyDiscountCode = async (req, res) => {
  const { code, orderTotal } = req.body;

  try {
    const discountCode = await DiscountCode.findOne({ code });

    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found.' });
    }

    // Check expiration date
    if (discountCode.expirationDate && discountCode.expirationDate < new Date()) {
      return res.status(400).json({ message: 'Discount code has expired.' });
    }

    // Check usage limit
    if (discountCode.usageLimit && discountCode.timesUsed >= discountCode.usageLimit) {
      return res.status(400).json({ message: 'Discount code usage limit reached.' });
    }

    // Check minimum purchase amount
    if (discountCode.minPurchaseAmount && orderTotal < discountCode.minPurchaseAmount) {
      return res.status(400).json({ message: `Minimum purchase amount is ₹${discountCode.minPurchaseAmount}.` });
    }

    // Calculate discount
    let discountAmount = 0;
    if (discountCode.discountType === 'percentage') {
      discountAmount = (discountCode.discountValue / 100) * orderTotal;
      if (discountCode.maxDiscountAmount && discountAmount > discountCode.maxDiscountAmount) {
        discountAmount = discountCode.maxDiscountAmount;
      }
    } else {
      discountAmount = discountCode.discountValue;
    }

    // Update times used
    discountCode.timesUsed += 1;
    await discountCode.save();

    res.status(200).json({ discountAmount, finalPrice: orderTotal - discountAmount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  applyDiscountCode,

};
