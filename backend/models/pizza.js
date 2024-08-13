// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Import the 'os' module to use its 'type' function
const { type } = require("os");

// Create a Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the pizza schema with fields for task, description, status, and time
let pizzaSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  time: { type: Number },
});

// Create a model named 'pizza' based on the defined schema
// This model provides methods to query and update the 'pizza' collection in MongoDB
// Export the model so it can be used in other parts of the application
module.exports = mongoose.model("pizza", pizzaSchema);
