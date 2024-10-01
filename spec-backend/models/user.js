const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
      
        unique: true
      },
      dob: {
        type: Date,
       
      },
      profilePic: {
        type: String, // File path or URL for the profile picture
        default: ''
      },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  // Validates that phone is a 10-digit number
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    otp: { type: String }, // Store OTP temporarily
    otpExpiration: { type: Date }, // Expiration for OTP
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    profile: [{
        name: {
            type: String,
            unique: true
        },
        dob: {
            type: Date
        },
        profilePic: {
            type: String, // File path or URL for the profile picture
            default: ''
        }
    }]
});

// Method to generate an authentication token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// Static method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(`User with email ${email} not found. Please register or check your email address.`);
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password. Please try again or reset your password.');
    }
  
    return user;
};

userSchema.index({ email: 1, _id: 1 }); // compound index on email and _id

const User = mongoose.model('User', userSchema);

module.exports = User;
