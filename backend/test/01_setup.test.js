// Set the environment variable to "test"
// This is important to ensure that the tests do not affect the production database
process.env.NODE_ENV = "test";

// Import the necessary models
// These models are used to interact with the database
const Product = require("../models/pizza");
const User = require("../models/user");

// Before each test, clean up the database
// This ensures that each test starts with a clean slate
beforeEach((done) => {
  // Delete all products
  // This is done by calling the deleteMany function with an empty filter
  // The callback function is called when the deletion is complete
  // If there is an error, it is passed to the callback function
  Product.deleteMany({}, function (err) {});

  // Delete all users
  // This is done by calling the deleteMany function with an empty filter
  // The callback function is called when the deletion is complete
  // If there is an error, it is passed to the callback function
  User.deleteMany({}, function (err) {});

  // Call the done function to indicate that the setup is complete
  // This allows the test to start
  done();
});

// After each test, clean up the database
// This ensures that the changes made by the test do not affect other tests
afterEach((done) => {
  // Delete all users
  // This is done by calling the deleteMany function with an empty filter
  // The callback function is called when the deletion is complete
  // If there is an error, it is passed to the callback function
  User.deleteMany({}, function (err) {});

  // Delete all products
  // This is done by calling the deleteMany function with an empty filter
  // The callback function is called when the deletion is complete
  // If there is an error, it is passed to the callback function
  Product.deleteMany({}, function (err) {});

  // Call the done function to indicate that the cleanup is complete
  // This allows the next test to start
  done();
});
