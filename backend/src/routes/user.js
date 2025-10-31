const express = require("express");

// controllers
const {
  signUp,
  userLogin,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  deleteUser,
} = require("../controllers/user");

// middlewares
const verifyUser = require("../middlewares/verifyUser");
const adminsOnly = require("../middlewares/adminsOnly");
const router = express.Router();

// routes
router.post("/register", signUp);
router.post("/login", userLogin);
router.post("/logout", verifyUser, logoutUser);
router.get("/profile", verifyUser, getUserProfile);
router.put("/update-profile", verifyUser, updateUserProfile);
router.put("/update-password", verifyUser, updatePassword);
router.get("/all-users", verifyUser, adminsOnly, getAllUsers);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
