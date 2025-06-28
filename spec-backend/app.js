const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
}

// const corsOptions = {
//     origin: 'https://zoopiceye-opticals.onrender.com', 
//     credentials: true,               
//     allowedHeaders: ['Content-Type', 'Authorization']
// };
const allowedOrigins = [
  'http://localhost:5173',
  'https://zoopiceye-web.vercel.app',
  'https://zoopiceye-opticals.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

app.use((req, res, next) => {
  console.log('🔍 Request Origin:', req.headers.origin);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/uploads', (req, res, next) => {
//     console.log('Serving file:', req.url);
//     next();
//   }, express.static('uploads'));
  
app.use('/uploads', (req, res, next) => {
    if (!req.url.includes('1727159310812-spec15.jpg')) {  // Change this if you have multiple defaults
      console.log('Serving file:', req.url);
    }
    next();
  }, express.static(path.join(__dirname, 'uploads')));

const Session = require("./routes/session");
const User = require("./routes/user");
const Collection = require("./routes/collection");
const Offer = require("./routes/offer");
const Discount = require("./routes/discount");
const Gift = require("./routes/giftCard");
const Order = require("./routes/order");
const UserProfile = require("./routes/userProfile");
const Contact = require("./routes/contact");
const Nodemailer = require("./routes/nodemailer");
const Payment = require("./routes/paymentRoute");

app.use("/api/v1", Session);
app.use("/api/v1", User);
app.use("/api/v1", Collection);
app.use("/api/v1", Offer);
app.use("/api/v1", Discount);
app.use("/api/v1", Gift);
app.use("/api/v1", Order);
app.use("/api/v1", UserProfile);
app.use("/api/v1", Contact);
app.use("/api/v1", Nodemailer);
app.use("/api/v1", Payment);
app.use(express.static(path.join(__dirname, "../spec-web/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "spec-web", "dist", "index.html"));
});

module.exports = app;
