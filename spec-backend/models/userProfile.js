const mongoose = require('mongoose');

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
    type: String, 
  },
}, { timestamps: true }); 

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
