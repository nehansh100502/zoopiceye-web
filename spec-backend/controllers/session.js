// const Session = require('../models/session');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Function to generate JWT token
// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// // Signup Function
// exports.Signup = async (req, res) => {
//     const { email, username, password, confirmedPassword } = req.body;

//     // Check if passwords match
//     if (password !== confirmedPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     try {
//         // Check if user with the given email or username already exists
//         const existingUser = await Session.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email or Username already exists' });
//         }

//         // Hash the password before saving to the database
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await Session.create({ email, username, password: hashedPassword });

//         // Generate JWT token
//         const token = generateToken(newUser._id);

//         // Add the token to the user's tokens array
//         newUser.tokens = [{ token }];
//         await newUser.save();

//         // Send response with user data and token
//         res.status(201).json({ message: 'User created', user: newUser, token });
//     } catch (error) {
//         // Handle server errors
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Login Function
// exports.Login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await Session.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Email not found' });
//         }

//         // // Log the retrieved user for debugging
//         // console.log('Retrieved user:', user);

//         // Ensure both password and hashed password are defined
//         if (!password || !user.password) {
//             return res.status(400).json({ message: 'Password is required' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Incorrect password' });
//         }

//         const token = generateToken(user._id);
//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// exports.Logout = async (req, res) => {
//     try {
//         const token = req.token; // Assume the token is set by a middleware
//         const userId = req.user._id; // Assume req.user is set by a middleware

//         // Find the user by their ID and token
//         const session = await Session.findOne({ _id: userId });
//         if (!session) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Remove the token from the user's tokens array
//         session.tokens = session.tokens.filter((storedToken) => storedToken.token !== token);
//         await session.save();

//         res.status(200).json({ message: 'Logout successful' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };