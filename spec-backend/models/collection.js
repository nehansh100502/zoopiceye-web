const mongoose = require('mongoose');

const spectacleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'kids'], required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['sunglasses', 'eyeglasses', 'contactlenses','frame'], required: true },
  frameShape: { 
    type: String, 
    enum: ['Butterfly', 'Cat Eye', 'Flier', 'Hexagon', 'Oval', 'Pentagon', 'Rectangular', 'Round', 'Square'], 
    required: true 
  },  
  frameMaterial: { 
    type: String, 
    enum: ['Acetate', 'Acetate & Alloy Metal', 'Alloy Metal', 'Alloy Metal & Polycarbonate', 'Alloy Metal & TR90', 'HD Acetate', 'Metal', 'Polycarbonate', 'TR90', 'Ultem'], 
    required: true 
  },  
  images: [String],
  description: { type: String },
  stock: { type: Number, },
  sku: { type: String, unique: true, required: true },
  discount: { type: Number, },
  isDiscountActive: { type: Boolean, default: false } ,
  colors: [{
    colorName: String,
    colorCode: String,
  }],
}, {
  timestamps: true,
});

const Spectacle = mongoose.model('Spectacle', spectacleSchema);

module.exports = Spectacle;

