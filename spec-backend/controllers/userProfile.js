const UserProfile = require('../models/userProfile');
const path = require('path');
const fs = require('fs');

exports.updateProfile = async (req, res) => {
  const { name, dob } = req.body;
  // let profilePicPath = '';

  // If profilePic exists, save it to the filesystem
  if (req.file) {
    // Store profile picture in 'uploads' folder
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    
    // Construct the path for the new file
    profilePicPath = path.join(uploadDir, `${Date.now()}-${req.file.originalname}`);
    
    // Move the file from the request buffer to the filesystem
    try {
      fs.writeFileSync(profilePicPath, req.file.buffer);
    } catch (fileError) {
      return res.status(500).json({ message: 'Failed to save profile picture', error: fileError });
    }
  }

  try {
    let user = await UserProfile.findOneAndUpdate(
      { name },
      { name, dob,},
      { new: true, upsert: true } 
    );

    // Respond with the updated or created user profile
    res.status(200).json({
      message: 'Profile updated successfully!',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
