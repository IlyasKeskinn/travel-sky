const express = require("express");
const router = express.Router(); // Create a new router instance


const { signUp } = require("../controller/user.controller");


// Route for user login
router.post("/login");

// Route for user registration
router.post("/register", signUp); // Calls the signUp function when a POST request is made to /register


module.exports = router;
