const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    // ✅ Step 1: Get token from cookies (not req.user)
    const token = req.cookies.token; // ismy cookies.token ka mtlb hy jou hum ny token ka name setkia hy controllers my wo

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided!" });
    }

    // ✅ Step 2: Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Step 3: Find user from database (excluding password)
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // ✅ Step 4: Attach user to req object
    req.user = user;

    // ✅ Step 5: Continue to next middleware or route
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

module.exports = verifyUser;
