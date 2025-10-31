const express = require("express");
const {
  signUp,
  userLogin,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", userLogin);
router.post("/logout", verifyUser, logoutUser);
router.get("/profile", verifyUser, getUserProfile);
router.put("/update-profile", verifyUser, updateUserProfile);

module.exports = router;
