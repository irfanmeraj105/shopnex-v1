const express = require("express");
const { signUp, userLogin, logoutUser } = require("../controllers/user");
const verifyUser = require("../middlewares/verifyUser");
const adminsOnly = require("../middlewares/adminsOnly");

const router = express.Router();

router.post("/register", signUp);
router.post("/login", userLogin);
router.post("/logout", verifyUser, adminsOnly ,logoutUser);

module.exports = router;
