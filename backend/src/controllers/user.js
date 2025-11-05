const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create User (Sign Up)
const signUp = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // 🧩 Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required!" });
    }

    // 🔍 Check if user already exists
    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧠 Create new user with defaults
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      address: address || "", // optional
      role: "user", // ✅ default role
      avatar:
        "https://res.cloudinary.com/demo/image/upload/v1691515333/default-avatar.png", // ✅ default avatar
    });

    // ✅ Response
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });   
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
// user login function

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if user exists
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userExists._id, role: userExists.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res
      .cookie("token", token, {
        httpOnly: true, // can't be accessed via JS
        secure: process.env.NODE_ENV === "production", // only https in production
        sameSite: "strict", // prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful!",
        user: {
          id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          role: userExists.role,
        },
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// logout user

const logoutUser = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logout failed!" });
  }
};

// get user's profile
const getUserProfile = async (req, res) => {
  try {
    const userProfile = await userModel
      .findById(req.user._id)
      .select("-password");
    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "user profile data is not found" });
    }
    return res
      .status(200)
      .json({ message: "user is this", success: true, userProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error || can't get the user profile data",
    });
  }
};

// update the user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found || for the updating" });
    }

    const { name, avatar, address } = req.body;

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (address) user.address = address;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "user updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error || can't update the user profile",
    });
  }
};

// update user password
const updatePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "old password not found" });
    }

    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "old password is wrong" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "password updated successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "you can't update the user password" });
  }
};

// get all users list

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    if (!users) {
      return res.status(400).json({
        message: "users not found || only admin can get all the users",
      });
    }

    const totalUsers = await userModel.countDocuments();

    return res.status(200).json({
      message: "This is the list of the users in our db",
      success: true,
      totalUsers,
      users,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "you are unauthorized|| only admin can do this" });
  }
};

// delete the user by id

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user!" });
  }
};

// Export
module.exports = {
  signUp,
  userLogin,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  deleteUser,
};
