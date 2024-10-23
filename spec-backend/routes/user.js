const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');  
const { authMiddleware } = require('../middleware/auth');
const { ForgotPassword, ResetPassword } = require('../middleware/auth');
const { GetUserProfile, GetUserDetails } = require('../controllers/user');
const { DeleteUserAccount } = require('../controllers/user');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { body } = require('express-validator');
const { updateProfile } = require('../controllers/userProfile');

const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password,phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword,phone });

        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Login request body:', req.body); 

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Login error:', error); 
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
});

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
        await req.user.save();
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.post('/forgot-password', (req, res, next) => {
    ForgotPassword(req, res, next);
});

router.post('/reset-password/:resetToken', (req, res, next) => {
    ResetPassword(req, res, next);
});
router.get('/user/profile', authMiddleware, GetUserProfile);


router.get('/user/Details', authMiddleware, GetUserDetails);

router.get('/user/delete/:userId', DeleteUserAccount);

router.post(
    '/updateProfile',
    upload.single('profilePic'), 
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('dob').isDate().withMessage('Date of birth must be a valid date'),
    ],
    updateProfile
  );

module.exports = router;



