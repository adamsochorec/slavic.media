"use strict";
// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");
// Import the 'os' module to use its 'type' function
const { type } = require("os");
// Create a Schema constructor from mongoose
const Schema = mongoose.Schema;
// Define the document schema with fields for task, description, status, and time
let articleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author: { type: String },
    date: { type: Number },
    thumbnail: { type: String },
});
// Export the model so it can be used in other parts of the application.
module.exports = mongoose.model("test", articleSchema);
