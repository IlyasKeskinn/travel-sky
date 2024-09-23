const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = async function (req, res, next) {
  try {
    // Access the JWT token from the cookies
    const token = req.cookies?.user;

    // Check if the token is not present or is undefined
    if (!token || token === undefined) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Find the user associated with the decoded token ID, excluding the password field
    const user = await User.findById(decoded.userId).select("-password");

    // Attach the user information to the request object for use in subsequent middleware/routes
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.log(`Error in isAuth middlewares : ${error.message}`);
    }
  }
};
