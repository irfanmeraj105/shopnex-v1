const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();
const userRoutes = require("./src/routes/user");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// database
connectDB();

// routes
app.use("/auth", userRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
