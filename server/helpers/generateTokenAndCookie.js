const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//Generates a JWT token and sets it as a cookie in the response.
const generateTokenAndCookie = (userId, res) => {
  // Sign a JWT token with the user's ID and a secret key
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "10d", // 10 days
  });
  // Set the JWT token as a cookie in the response
  res.cookie("user", token, {
    httpOnly: true, // Only accessible to the web server
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

module.exports = { generateTokenAndCookie };
