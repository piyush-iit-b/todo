require("dotenv").config(); // Must be at the very top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const router = require("../backend/model2/routes");

app.use(cors());
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