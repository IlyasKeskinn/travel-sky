const User = require("../models/user.model");
const bcyrpt = require("bcrypt");
const { generateTokenAndCookie } = require("../helpers/generateTokenAndCookie");
const isValidEmail = require("../helpers/emailController");

// Function to handle user sign-up
const signUp = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
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

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json({ message: "There is no user associated with this email!" });
    }
    const isMatch = await bcyrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokenAndCookie(user._id, res);
    res.status(200).json({ _id: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("user", "", { maxAge: 1 });
  res.status(200).json({ message: "User logout succesfully." });
};

module.exports = { signUp, signIn, logout };
