// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Create a Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the user schema with fields for name, email, password, and date
let userSchema = new Schema({
  // The 'name' field represents the user's name
  // It is required, and its length must be between 6 and 255 characters
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },

  // The 'email' field represents the user's email
  // It is required, and its length must be between 6 and 255 characters
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },

  // The 'password' field represents the user's password
  // It is required, and its length must be between 6 and 255 characters
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },

  // The 'date' field represents the date when the user was created
  // By default, it is set to the current date and time
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a model named 'User' based on the defined schema
// This model provides methods to query and update the 'User' collection in MongoDB
// Export the model so it can be used in other parts of the application
module.exports = mongoose.model("User", userSchema);
