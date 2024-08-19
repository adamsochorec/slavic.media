// Import the necessary modules
const router = require("express").Router(); // Express router to define the routes
const User = require("../models/user"); // User model to interact with the database
const bcrypt = require("bcrypt"); // bcrypt to hash passwords
const { registerValidation, loginValidation } = require("../validation"); // Validation functions
const jwt = require("jsonwebtoken"); // jsonwebtoken to create authentication tokens

// User registration endpoint
router.post("/register", async (req, res) => {
  try {
    // Validate the user input (name, email, password)
    // If the validation fails, return an error message
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email is already registered
    // If the email is already registered, return an error message
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password using bcrypt
    // The salt is a random value that is used to create the hash
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create a new user object and save it to the database
    const userObject = new User({
      name: req.body.name,
      email: req.body.email,
      password,
    });

    // Save the user object to the database
    // If the save is successful, return the user's id
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    // If there is an error, return a server error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
router.post("/login", async (req, res) => {
  try {
    // Validate user login info
    // If the validation fails, return an error message
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    // If login info is valid, find the user in the database
    const user = await User.findOne({ email: req.body.email });

    // If the user does not exist, return an error message
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If the user exists, check if the password is correct
    // If the password is incorrect, return an error message
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If the password is correct, create an authentication token
    // The token includes the user's name and id
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.TOKEN_SECRET || "your_default_secret",
      {
        expiresIn: process.env.JWR_EXPIRES_IN || "1h",
      }
    );

    // Attach the authentication token to the header and return it in the response
    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    // If there is an error, return a server error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
