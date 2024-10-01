const Spectacle = require('../models/collection');


const getSpectacles = async (req, res) => {
  try {
    const { gender, price, category, frameShape, frameMaterial } = req.query;
    const filters = {};

    if (gender) filters.gender = gender;
    if (category) filters.category = category;
    if (frameShape) filters.frameShape = frameShape; // Added frameShape filter
    if (frameMaterial) filters.frameMaterial = frameMaterial; // Added frameMaterial filter

    if (price) {
      const priceRange = price.split('-');
      filters.price = {
        $gte: parseInt(priceRange[0]),
        $lte: priceRange[1] === '+' ? Number.MAX_SAFE_INTEGER : parseInt(priceRange[1]),
      };
    }

    const spectacles = await Spectacle.find(filters);
    res.status(200).json(spectacles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific spectacle by ID
const getSpectacleById = async (req, res) => {
  try {
    const { id } = req.params;
    const spectacle = await Spectacle.findById(id);

    if (!spectacle) return res.status(404).json({ message: 'Spectacle not found' });

    res.status(200).json(spectacle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// const addSpectacle = async (req, res) => {
//   try {
//     const colors = JSON.parse(req.body.colors.trim());
//     const { name, gender, price, category, description, stock, frameShape, frameMaterial, discount, isDiscountActive,  } = req.body;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'Please upload at least one image' });
//     }

//     const images = req.files.map(file => file.filename);
//     const imageUrls = images.map(filename => `/uploads/${filename}`);
//     const sku = `SKU${Date.now()}-${Math.floor(Math.random() * 10000)}`;

//     const newSpectacle = new Spectacle({
//       name,
//       gender,
//       price,
//       category,
//       frameShape,  
//       frameMaterial,  
//       images: imageUrls,
//       description,
//       stock,
//       sku,
//       discount,
//       isDiscountActive,
//       colors // Include colors as part of the spectacle
//     });

//     await newSpectacle.save();
//     res.status(201).json(newSpectacle);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const addSpectacle = async (req, res) => {
  try {
    // Check if colors is sent as a string and parse it
    let colors;
    if (typeof req.body.colors === 'string') {
      colors = JSON.parse(req.body.colors.trim());
    } else {
      colors = req.body.colors; // Assuming it's already an array
    }

    // Validate that colors is an array
    if (!Array.isArray(colors)) {
      return res.status(400).json({ message: 'Colors should be an array' });
    }

    // Extract other fields
    const {
      name,
      gender,
      price,
      category,
      description,
      stock,
      frameShape,
      frameMaterial,
      discount,
      isDiscountActive,
    } = req.body;

    // Validate required fields
    if (!name || !gender || !price || !category || !description || !stock || !frameShape || !frameMaterial) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for uploaded images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Process images
    const images = req.files.map(file => file.filename);
    const imageUrls = images.map(filename => `/uploads/${filename}`);
    const sku = `SKU${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Create a new spectacle instance
    const newSpectacle = new Spectacle({
      name,
      gender,
      price,
      category,
      frameShape,
      frameMaterial,
      images: imageUrls,
      description,
      stock,
      sku,
      discount,
      isDiscountActive,
      colors, // Include colors as part of the spectacle
    });

    // Save the spectacle to the database
    await newSpectacle.save();
    res.status(201).json(newSpectacle);
  } catch (error) {
    console.error('Error adding spectacle:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateColors = async (req, res) => {
  try {
    const { id } = req.params;
    const { colors } = req.body;

    const spectacle = await Spectacle.findById(id);
    if (!spectacle) {
      return res.status(404).json({ message: 'Spectacle not found' });
    }

    spectacle.colors = colors;
    spectacle.stock = colors.reduce((acc, color) => acc + color.stock, 0);

    await spectacle.save();

    res.status(200).json({
      message: 'Spectacle colors and stock updated successfully',
      spectacle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const updateSpectacle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedSpectacle = await Spectacle.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSpectacle) return res.status(404).json({ message: 'Spectacle not found' });

    res.status(200).json(updatedSpectacle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Controller to add or update color stock
exports.updateColors = async (req, res) => {
  try {
    const { id } = req.params;
    const { colors } = req.body;

    // Fetch spectacle by ID
    const spectacle = await Spectacle.findById(id);
    if (!spectacle) {
      return res.status(404).json({ message: 'Spectacle not found' });
    }

    // Update color stock
    spectacle.colors = colors;

    // Optionally calculate the total stock
    spectacle.stock = colors.reduce((acc, color) => acc + color.stock, 0);

    // Save the updated spectacle
    await spectacle.save();

    res.status(200).json({
      message: 'Spectacle colors and stock updated successfully',
      spectacle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Delete a spectacle by ID
const deleteSpectacle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSpectacle = await Spectacle.findByIdAndDelete(id);

    if (!deletedSpectacle) return res.status(404).json({ message: 'Spectacle not found' });

    res.status(200).json({ message: 'Spectacle deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSpectacles,
  getSpectacleById,
  addSpectacle,
  updateSpectacle,
  deleteSpectacle,
};
