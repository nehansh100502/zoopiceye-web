// const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const sessionSchema = new mongoose.Schema({
 
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
//     confirmedPassword:{
//         type: String,
//         required: true,
//     },
//     tokens: [
//         {
//             token: {
//                 type: String,
//                 required: true,
//             }
//         }
//     ]
// });

// sessionSchema.index({ userId: 1 }); 
// sessionSchema.index({ email: 1 });
// sessionSchema.index({ email: 1, password: 1 })
// module.exports = mongoose.model('Session', sessionSchema);
