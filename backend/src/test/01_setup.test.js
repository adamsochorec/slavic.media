// Set the environment variable to "test"
// This is important to ensure that the tests do not affect the production database
process.env.NODE_ENV = "test";

// Import the necessary models
const Employee = require("../models/employee");
const Event = require("../models/event");
const Gallery = require("../models/gallery");
const Img = require("../models/img");
const Reel = require("../models/reel");
const Review = require("../models/review");
const Slide = require("../models/img");
const Video = require("../models/img");
const User = require("../models/user");

// Before each test, clean up the database
// This ensures that each test starts with a clean slate
beforeEach((done) => {
  Employee.deleteMany({}, function (err) {});
  Event.deleteMany({}, function (err) {});
  Gallery.deleteMany({}, function (err) {});
  Img.deleteMany({}, function (err) {});
  Reel.deleteMany({}, function (err) {});
  Review.deleteMany({}, function (err) {});
  Slide.deleteMany({}, function (err) {});
  Video.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});

afterEach((done) => {
  Employee.deleteMany({}, function (err) {});
  Event.deleteMany({}, function (err) {});
  Gallery.deleteMany({}, function (err) {});
  Img.deleteMany({}, function (err) {});
  Reel.deleteMany({}, function (err) {});
  Review.deleteMany({}, function (err) {});
  Slide.deleteMany({}, function (err) {});
  Video.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});
