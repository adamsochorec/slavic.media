// Set the environment variable to "test"
process.env.NODE_ENV = "test";

// Import the necessary models (use import for TypeScript)
import Employee from "../models/employee";
import Event from "../models/event";
import Gallery from "../models/gallery";
import Img from "../models/img";
import Reel from "../models/reel";
import Review from "../models/review";
import Slide from "../models/img";
import Video from "../models/img";
import User from "../models/user";

// Helper function to clear all collections
const clearCollections = async () => {
  await Promise.all([
    Employee.deleteMany({}),
    Event.deleteMany({}),
    Gallery.deleteMany({}),
    Img.deleteMany({}),
    Reel.deleteMany({}),
    Review.deleteMany({}),
    Slide.deleteMany({}),
    Video.deleteMany({}),
    User.deleteMany({}),
  ]);
};

// Before each test, clean up the database
beforeEach(async () => {
  await clearCollections();
});

// After each test, clean up the database
afterEach(async () => {
  await clearCollections();
});
