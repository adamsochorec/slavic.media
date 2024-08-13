// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Import the 'os' module to use its 'type' function
const { type } = require("os");

// Create a Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the pizza schema with fields for task, description, status, and time
let pizzaSchema = new Schema({
  // The 'task' field represents the name of the task
  task: { type: String },

  // The 'description' field provides more details about the task
  description: { type: String },

  // The 'status' field indicates the current status of the task
  status: { type: String },

  // The 'time' field represents the time taken to complete the task
  time: { type: Number },
});

// Create a model named 'pizza' based on the defined schema
// This model provides methods to query and update the 'pizza' collection in MongoDB
// Export the model so it can be used in other parts of the application
module.exports = mongoose.model("pizza", pizzaSchema);
