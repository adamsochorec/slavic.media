// Import Joi for data validation
const Joi = require("joi");
// Import JSON Web Token (JWT) for token-based authentication
const jwt = require("jsonwebtoken");

// Function to validate user registration data
const registerValidation = (data) => {
  // Define the schema for validation
  const schema = Joi.object({
    // Name must be a string between 6 and 255 characters and is required
    name: Joi.string().min(6).max(255).required(),
    // Email must be a string between 6 and 255 characters and is required
    email: Joi.string().min(6).max(255).required(),
    // Password must be a string between 6 and 255 characters and is required
    password: Joi.string().min(6).max(255).required(),
  });

  // Validate the data against the schema
  return schema.validate(data);
};

// Function to validate user login data
const loginValidation = (data) => {
  // Define the schema for validation
  const schema = Joi.object({
    // Email must be a string between 6 and 255 characters and is required
    email: Joi.string().min(6).max(255).required(),
    // Password must be a string between 6 and 255 characters and is required
    password: Joi.string().min(6).max(255).required(),
  });

  // Validate the data against the schema
  return schema.validate(data);
};

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Retrieve the token from the request header
  const token = req.header("auth-token");
  // If no token is found, respond with an access denied error
  if (!token) return res.status(401).json({ error: "Access Denied" });
  try {
    // Verify the token using the secret key from environment variables
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // Attach the verified token payload to the request object
    req.user = verified;
    // Proceed to the next middleware function
    next();
  } catch (error) {
    // If token verification fails, respond with an invalid token error
    res.status(400).json({ error: "Token is not valid" });
  }
};

// Export the validation functions and middleware for use in other modules
module.exports = { registerValidation, loginValidation, verifyToken };
