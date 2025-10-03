// This file serves as an entry point for Vercel serverless functions
// It imports and initializes the server application from the built distribution folder

// First, check and set NODE_ENV if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Import the Express app from the dist directory
const app = require("../dist/app").default;

// For Vercel serverless functions, we need to export a handler
module.exports = app;
