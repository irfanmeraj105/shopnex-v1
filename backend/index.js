const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
connectDB();

// routes

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
