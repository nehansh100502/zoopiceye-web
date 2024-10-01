
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config/config.env" });
}

// Set up CORS options to allow frontend requests
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your frontend origin
    credentials: true,               // Allow credentials (cookies, etc.)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS and middleware for handling JSON and URL-encoded data
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', (req, res, next) => {
    console.log('Serving file:', req.url);
    next();
  }, express.static('uploads'));
  

// Import and use routes
const Session = require("./routes/session");
const User = require("./routes/user");
const Collection = require("./routes/collection");
const Offer = require("./routes/offer");
const Discount = require("./routes/discount");
const Gift = require("./routes/giftCard");
const Order = require("./routes/order");
const UserProfile = require("./routes/userProfile");
const Contact = require("./routes/contact");

app.use("/api/v1", Session);
app.use("/api/v1", User);
app.use("/api/v1", Collection);
app.use("/api/v1", Offer);
app.use("/api/v1", Discount);
app.use("/api/v1", Gift);
app.use("/api/v1", Order);
app.use("/api/v1", UserProfile);
app.use("/api/v1", Contact);

module.exports = app;
