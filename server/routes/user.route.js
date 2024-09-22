const express = require("express");
const router = express.Router(); // Create a new router instance

const { signUp, signIn, logout } = require("../controller/user.controller");

// Route for user login
router.post("/login", signIn); // Calls the signIn function when a POST request is made to /login

// Route for user registration
router.post("/register", signUp); // Calls the signUp function when a POST request is made to /register

// Route for user logout
router.get("/logout", logout); // Calls the logout function when a GET request is made to /logout

module.exports = router;
