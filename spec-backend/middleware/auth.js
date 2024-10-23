const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Order = require('../models/order');
const sendEmail = require('../utils/sendEmail');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }
        req.user = decoded; 
        next();
    });
};

// Original auth middleware (unchanged)
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error('User not found or token invalid.');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Token has expired. Please log in again.' });
        }
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
  
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user; // Save the user info in request object for later use
      next(); // Proceed to the next middleware or route handler
    });
  }

const RefreshToken = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error('User not found');
        }

        const newToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Remove the expired token
        user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== token);
        user.tokens.push({ token: newToken });
        await user.save();

        res.send({ token: newToken });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Your session has expired. Please log in again.' });
        }
        res.status(401).send({ error: 'Please authenticate.' });
    }
};


// Logout Endpoint
const Logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
        await req.user.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Forgot Password Endpoint
const ForgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://localhost:4000/reset-password/${token}`;
        await sendEmail({
            to: req.body.email,
            subject: 'Password Reset',
            text: `Click this link to reset your password: ${resetUrl}`,
        });

        res.send({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};

// Reset Password Endpoint

const ResetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send({ error: 'Invalid or expired reset token' });
        }

        user.password = req.body.password; // Ensure password validation
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.send({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset Password error:', error);
        res.status(500).send({ error: 'Server error during password reset' });
    }
};

module.exports = { auth,authenticateUser, authMiddleware, RefreshToken, Logout, ForgotPassword, ResetPassword ,};
