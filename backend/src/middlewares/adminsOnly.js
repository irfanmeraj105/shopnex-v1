const adminsOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error in admin authorization." });
  }
};

module.exports = adminsOnly;
