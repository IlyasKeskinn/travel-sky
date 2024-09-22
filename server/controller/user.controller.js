const User = require("../models/user.model");
const bcyrpt = require("bcrypt");
const { generateTokenAndCookie } = require("../helpers/generateTokenAndCookie");
const isValidEmail = require("../helpers/emailController");

// Function to handle user sign-up
const signUp = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

  try {
    // Validate the email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcyrpt.genSalt(10);
    const hashPassword = await bcyrpt.hash(password, salt);

    // Create a new user object
    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Check if the user was created successfully
    if (newUser) {
      // Generate token and cookie for the user
      generateTokenAndCookie(newUser._id, res);

      res
        .status(201)
        .json({ _id: newUser._id, email: newUser.email, name: newUser.name });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp };
