require("dotenv").config(); // Must be at the very top
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
const router = require("./model2/routes");


app.use(cors({
  origin: [
    "https://soft-faun-bc627d.netlify.app", // Replace with your actual Vercel domain
    "http://localhost:5173",                 // For local testing
    "http://localhost:5000" 
  ],
  credentials: true
}));
app.use(express.json());
app.use("/user", router);
 
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT} & MongoDB connected`))
  )
  .catch((err) => console.log("Database connection error:", err));
