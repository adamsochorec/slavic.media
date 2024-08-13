// Set the Node environment to 'test'
process.env.NODE_ENV = "test";

// Import the Chai assertion library
const chai = require("chai");
// Extract the 'expect' assertion style from Chai
const expect = chai.expect;
// Import the Chai HTTP plugin to facilitate HTTP integration testing
const chaiHttp = require("chai-http");
// Import the server module (assumes the server is defined in a file named 'server' in the parent directory)
const server = require("../../server");

// This import statement seems redundant and conflicts with the previous import
// import chai from "chai"; // Remove or comment out this line as Chai is already imported

// Define a test suite named '/First Test Collection'
describe("/First Trst Collection", function () {
  // Define an individual test case
  it("should test two values...", function () {
    // Define the expected value
    let expectedVal = 10;
    // Define the actual value
    let actualVal = 5;

    // Assert that the actual value is equal to the expected value
    expect(actualVal).to.be.equal(expectedVal);
  });
});
