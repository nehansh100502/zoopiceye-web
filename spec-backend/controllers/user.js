const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Session = require('../models/session');
const Order = require('../models/order');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');
const { sendEmail } = require('../utils/sendEmail');

// Function to generate JWT token
const generateToken = (userId, username) => {
    return jwt.sign({ userId, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Helper function to capitalize the first letter of each word
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Signup Function with Validation Middleware
exports.Signup = [
    // Validation rules
    body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
    .matches(/^[A-Za-z ]+$/).withMessage('Username can only contain letters and spaces'),

    body('email')
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),

   
    // Controller logic
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { username, email, password, phone } = req.body;

        try {
            console.log('Signup request body:', req.body);  // Debugging

            // Check if the email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Check if the username already exists
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Capitalize the first letter of each word in the username
            username = capitalizeWords(username);

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ username, email, password: hashedPassword, phone });
            await newUser.save();

            // Generate a token
            const token = generateToken(newUser._id, username);

            // Send response with token and user information
            res.status(201).json({ 
                message: 'User created successfully', 
                user: newUser, 
                token,
                redirectUrl: '/'  // Home page or wherever you want to redirect
            });
        } catch (error) {
            console.error('Signup error:', error);  // Debugging
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
];

// Login Function (No validation changes required)
exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request body:', req.body);  // Debugging

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        console.log('Stored hashed password:', user.password);  // Debugging

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);  // Debugging

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password. Please try again or reset your password.' });
        }

        // Generate a token with user ID and username
        const token = generateToken(user._id, user.username);

        // Save session data
        await Session.create({ userId: user._id, username: user.username, token });

        // Respond with the token and username
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            username: user.username, // Ensure this is included
        });
    } catch (error) {
        console.error('Login error:', error);  // Debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.Logout = async (req, res) => {
    try {
        // Log the incoming request for debugging
        console.log('Logout request for user:', req.user._id);

        // Remove the token from the user's tokens array
        req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
        await req.user.save();

        res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};


// Forgot Password Function
exports.ForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Forgot Password request:', req.body);  // Debugging

        // Find the user by email
        const user = await User.findOne({ email });

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token
        const resetToken = generateToken(user._id, user.username);  // Adjust as needed

        // Save the reset token to the user's document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send the password reset email
        const resetUrl = `http://localhost:4000/reset-password/${resetToken}`;
        await sendEmail({
            to: email,
            subject: 'Password Reset',
            text: `Click this link to reset your password: ${resetUrl}`,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot Password error:', error);  // Debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Reset Password Function
exports.ResetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        console.log('Reset Password request:', req.body);  // Debugging

        // Find the user by reset token
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'Invalid reset token' });
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset Password error:', error);  // Debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.GetUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('username email');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
       
        res.json({ 
            success: true, 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


// exports.GetUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select('username email');
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.json({ 
//             success: true, 
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };


exports.GetUserDetails = async (req, res) => {
    try {
        // Extract the user ID from the authenticated user
        const userId = req.user ? req.user._id : null;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: No user ID available' });
        }

        // Fetch user data based on the ID
        const user = await User.findById(userId).select('username email');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch orders associated with the user
        const orders = await Order.find({ userId: userId }).select('orderDetails createdAt'); // Modify this select statement based on your Order schema

        // Return the user profile along with orders
        res.json({
            success: true,
            user: {
                _id: user._id, // User ID
                username: user.username, // Username
                email: user.email, // Email
                orders: orders, // Orders created by the user
            },
        });
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



// exports.GetUserDetails = async (req, res) => {
//     try {
//         // Ensure the user ID is extracted correctly
//         const userId = req.user ? req.user._id : null;

//         if (!userId) {
//             return res.status(401).json({ error: 'Unauthorized: No user ID available' });
//         }

//         // Fetch user data (username, email)
//         const user = await User.findById(userId).select('username email');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Fetch user's orders (adjust based on your schema)
//         const orders = await Order.find({ userId: userId })
//                                   .select('orderDetails createdAt')
//                                   .lean();  // Optional: converts the Mongoose documents to plain objects

//         // Return the user's profile along with their orders
//         res.json({
//             success: true,
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 orders: orders,  // Attach the orders here
//             },
//         });
//     } catch (error) {
//         console.error('Error fetching user details:', error.message);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// Delete User Account Function
exports.DeleteUserAccount = async (req, res) => {
    try {
        // Log the request for debugging
        console.log('Delete Account request for user:', req.user._id);

        // Find the user by ID and delete them
        const deletedUser = await User.findByIdAndDelete(req.user._id);

        // Check if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, you could delete any related data, such as sessions or orders here

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete Account error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}; 
// Controller for updating or creating user profile
exports.updateProfile = async (req, res) => {
    const { name, dob } = req.body;
    let profilePicPath = '';
  
    // If profilePic exists, save it to the filesystem or cloud storage
    if (req.file) {
      // Store profile picture in 'uploads' folder
      const uploadDir = path.join(__dirname, '..', 'uploads');
      
      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      
      // Save the file to the 'uploads' directory
      profilePicPath = path.join(uploadDir, `${Date.now()}-${req.file.originalname}`);
      fs.writeFileSync(profilePicPath, req.file.buffer);
    }
  
    try {
      // Check if user exists and update the profile, otherwise create a new one
      let user = await User.findOneAndUpdate(
        { name }, // Find by name or other unique identifier like `userId`
        { name, dob, profilePic: profilePicPath },
        { new: true, upsert: true } // Create new if not exists
      );
  
      res.status(200).json({
        message: 'Profile updated successfully!',
        user,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };
















// exports.GetUserProfile = async (req, res) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Unauthorized: No token provided' });
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Ensure token contains expected payload
//         if (!decoded || !decoded._id) {
//             return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//         }

//         const user = await User.findById(decoded._id).select('username email'); // Select both username and email
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({ username: user.username, email: user.email }); // Include email in the response
//     } catch (error) {
//         console.error('Error fetching user profile:', error.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// };


// exports.GetUserProfile = async (req, res) => {
//     try {
//         // First, try to get the userId from req.user if it's populated by authMiddleware
//         let userId = req.user ? req.user.id : null;

//         // Debugging: Log if userId from req.user is available
//         console.log('req.user.id:', req.user?.id);

//         // If req.user is not populated, fallback to checking the Authorization header
//         if (!userId) {
//             const authHeader = req.headers.authorization;
//             if (!authHeader || !authHeader.startsWith('Bearer ')) {
//                 return res.status(401).json({ error: 'Unauthorized: No token provided' });
//             }

//             const token = authHeader.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Ensure the token contains a valid user ID
//             if (!decoded || !decoded._id) {
//                 return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//             }

//             userId = decoded._id; // Use the _id from the decoded token

//             // Debugging: Log the decoded user ID from the token
//             console.log('Decoded User ID from token:', decoded._id);
//         }

//         // Fetch user data based on the ID from either the token or req.user
//         const user = await User.findById(userId).select('username email');

//         // Debugging: Log the fetched user data
//         console.log('Fetched User Data:', user);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Return the user profile, including username and email
//         res.json({
//             success: true,
//             user: {
//                 _id: user._id,       // User ID
//                 username: user.username, // Username
//                 email: user.email,   // Email
//             },
//         });

//     } catch (error) {
//         console.error('Error fetching user profile:', error.message);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };


