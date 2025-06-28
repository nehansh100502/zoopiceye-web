const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://zoopiceye-web.vercel.app",
  "https://zoopiceye-opticals.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ CORS must come BEFORE any route or body parsing
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors(corsOptions));



// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", (req, res, next) => {
  if (!req.url.includes("1727159310812-spec15.jpg")) {
    console.log("Serving file:", req.url);
  }
  next();
}, express.static(path.join(__dirname, "uploads")));

// Routes
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

// Frontend
app.use(express.static(path.join(__dirname, "../spec-web/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "spec-web", "dist", "index.html"));
});


app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    console.error("🔴 CORS Error Middleware:", err.message);
    return res.status(403).json({ error: "CORS policy error" });
  }
  next(err);
});

module.exports = app;

