"use strict";
/* // Set the environment variable to "test"
// This is important to ensure that the tests do not affect the production database
process.env.NODE_ENV = "test";

// Import the necessary models
// These models are used to interact with the database
import article from "../models/article";
import assets from "../models/assets";
import employee from "../models/employee";
import event from "../models/event";
import img from "../models/img";
import legal from "../models/review";
import user from "../models/user";
import video from "../models/video";

// Import the server to ensure routes are available
import server from "../server";

// Function to clean up the database
const cleanDatabase = async () => {
  const models = [article, assets, employee, event, img, legal, user, video];
  for (const model of models) {
    await model.deleteMany({});
  }
};

// Before each test, clean up the database
// This ensures that each test starts with a clean slate
beforeEach(async () => {
  await cleanDatabase();
});

// After each test, clean up the database
// This ensures that the changes made by the test do not affect other tests
afterEach(async () => {
  await cleanDatabase();
});
 */
