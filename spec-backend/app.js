const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config/config.env" });
}

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,               
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', (req, res, next) => {
    console.log('Serving file:', req.url);
    next();
  }, express.static('uploads'));
  

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

module.exports = app;
