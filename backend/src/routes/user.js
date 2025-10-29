const express = require("express");
const { signUp, userLogin, logoutUser } = require("../controllers/user");

const router = express.Router();

router.post("/register", signUp);
router.post("/login", userLogin);
router.post("/logout", logoutUser);

module.exports = router;
