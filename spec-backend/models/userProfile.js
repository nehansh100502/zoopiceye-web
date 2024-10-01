const mongoose = require('mongoose');

// Define the user profile schema
const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profilePic: {
    type: String, // This will store the file path or URL to the uploaded image
  },
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt timestamps

// Create and export the model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
