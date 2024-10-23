const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserProfile = require('../models/userProfile'); 

const upload = multer({ dest: 'uploads/' }); 

const { updateProfile } = require('../controllers/userProfile');

router.post('/UserProfile', upload.single('profilePic'), updateProfile);

router.get('/getUserProfileId', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find(); 
    if (userProfiles.length > 0) {
      const userProfile = userProfiles[0];
      return res.status(200).send({
        _id: userProfile._id,
        name: userProfile.name,
        dob: userProfile.dob,
        profilePic: userProfile.profilePic
      }); 
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
  const userId = req.params.id; 

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  try {
    const userProfile = await UserProfile.findById(userId); 

    if (!userProfile) {
      return res.status(404).send({ message: 'User profile not found.' });
    }

    return res.status(200).send({
      _id: userProfile._id,
      name: userProfile.name,
      dob: userProfile.dob,
      profilePic: userProfile.profilePic
    }); 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).send({ error: 'Unable to fetch user profile ID.' });
  }
});

module.exports = router;
