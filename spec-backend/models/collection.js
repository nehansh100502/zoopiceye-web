
// const mongoose = require('mongoose');

// const spectacleSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   gender: { type: String, enum: ['male', 'female', 'kids'], required: true },
//   price: { type: Number, required: true },
//   category: { type: String, enum: ['sunglasses', 'eyeglasses', 'contactlenses'], required: true },
//   frameShape: { 
//     type: String, 
//     enum: ['Butterfly', 'Cat Eye', 'Flier', 'Hexagon', 'Oval', 'Pentagon', 'Rectangular', 'Round', 'Square'], 
//     required: true 
//   },  
//   frameMaterial: { 
//     type: String, 
//     enum: ['Acetate', 'Acetate & Alloy Metal', 'Alloy Metal', 'Alloy Metal & Polycarbonate', 'Alloy Metal & TR90', 'HD Acetate', 'Metal', 'Polycarbonate', 'TR90', 'Ultem'], 
//     required: true 
//   },  
//   images: [String],
//   description: { type: String },
//   stock: { type: Number, default: 0 },
//   sku: { type: String, unique: true, required: true }
// }, {
//   timestamps: true,
// });

// const Spectacle = mongoose.model('Spectacle', spectacleSchema);

// module.exports = Spectacle;


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


// models/Spectacle.js

// const mongoose = require('mongoose');

// const colorSchema = new mongoose.Schema({
//   color: { type: String, required: true },  // Color name
//   hex: { type: String, required: true },   // Color hex code (for frontend)
//   stock: { type: Number, required: true, min: 0 }, // Stock for that color
// });

// const spectacleSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   gender: { type: String, required: true },
//   sku: { type: String, required: true },
//   frameMaterial: { type: String, required: true },
//   frameShape: { type: String, required: true },
//   discount: { type: Number },
//   images: [{ type: String }],
//   colors: [colorSchema],  // Added the colors field (an array of color objects)
//   stock: { type: Number, default: 0 },  // Optional overall stock (sum of all color stocks)
// });

// module.exports = mongoose.model('Spectacle', spectacleSchema);
