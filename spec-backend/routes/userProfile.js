const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken'); // Import JWT for token verification
const router = express.Router();
const UserProfile = require('../models/userProfile'); // Import the UserProfile model

// Set up multer for file upload (with memoryStorage or any other desired storage)
const upload = multer({ dest: 'uploads/' }); 

const { updateProfile } = require('../controllers/userProfile');

// Route to update profile
router.post('/UserProfile', upload.single('profilePic'), updateProfile);

// Route to get the first user profile, including name, dob, and profilePic
router.get('/getUserProfileId', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find(); // Fetch all user profiles
    if (userProfiles.length > 0) {
      const userProfile = userProfiles[0]; // Get the first user profile
      return res.status(200).send({
        _id: userProfile._id,
        name: userProfile.name,
        dob: userProfile.dob,
        profilePic: userProfile.profilePic
      }); // Return full profile data
    } else {
      return res.status(404).send({ message: 'No user profiles found.' });
    }
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return res.status(500).send({ error: 'Unable to fetch user profiles.' });
  }
});

// Fetch user profile by ID
router.get('/getUserProfile/:id', async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameters

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  try {
    const userProfile = await UserProfile.findById(userId); // Fetch user by ID

    if (!userProfile) {
      return res.status(404).send({ message: 'User profile not found.' });
    }

    return res.status(200).send({
      _id: userProfile._id,
      name: userProfile.name,
      dob: userProfile.dob,
      profilePic: userProfile.profilePic
    }); // Return full profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).send({ error: 'Unable to fetch user profile ID.' });
  }
});

module.exports = router;
