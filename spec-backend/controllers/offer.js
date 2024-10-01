const Offer = require('../models/offer');

// Get all offers
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new offer
const createOffer = async (req, res) => {
  const { title, description, imageUrl, discount, } = req.body;

  if (!title || !description || !imageUrl || !discount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOffer = new Offer({ title, description, imageUrl, discount, });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOffers, createOffer };
