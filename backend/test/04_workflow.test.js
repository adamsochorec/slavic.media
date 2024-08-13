// Import necessary libraries
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../server");

// Use chaiHttp for making HTTP requests in tests
chai.use(chaiHttp);

// Describe the group of tests
describe("Pizza workflow tests", () => {
  // Test for creating a pizza
  it("should register + login a user, create Pizza and verify 1 in DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 200 and the response body is an object with no errors
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // Make a POST request to login the user
        chai
          .request(server)
          .post("/api/user/login")
          .send({
            email: "mail@gabor.dk",
            password: "123456",
          })
          .end((err, res) => {
            // Assert that the response status is 200 and the response body has no errors
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // Define a new pizza
            let Pizza = {
              task: "Test",
              description: "test, test...",
              status: "Doing",
              time: 40,
            };

            // Make a POST request to create a new pizza
            chai
              .request(server)
              .post("/api/pizzas")
              .set({ "auth-token": token })
              .send(Pizza)
              .end((err, res) => {
                // Assert that the response status is 201, the response body is an array with one element, and the saved pizza matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // Make a GET request to verify the pizza in the database
                chai
                  .request(server)
                  .get("/api/pizzas/")
                  .end((err, res) => {
                    // Assert that the response status is 200, the response body is an array with one element
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(1);

                    done();
                  });
              });
          });
      });
  });

  // Test for deleting a pizza
  it("should register + login a user, create Pizza and delete it from DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 200 and the response body is an object with no errors
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // Make a POST request to login the user
        chai
          .request(server)
          .post("/api/user/login")
          .send({
            email: "mail@gabor.dk",
            password: "123456",
          })
          .end((err, res) => {
            // Assert that the response status is 200 and the response body has no errors
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            let token = res.body.data.token;

            // Define a new pizza
            let Pizza = {
              task: "Test Test",
              description: "test, test...",
              status: "Done",
              time: 20,
            };

            // Make a POST request to create a new pizza
            chai
              .request(server)
              .post("/api/pizzas")
              .set({ "auth-token": token })
              .send(Pizza)
              .end((err, res) => {
                // Assert that the response status is 201, the response body is an array with one element, and the saved pizza matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                let savedPizza = res.body[0];
                expect(savedPizza.task).to.be.equal(Pizza.task);
                expect(savedPizza.description).to.be.equal(Pizza.description);
                expect(savedPizza.status).to.be.equal(Pizza.status);
                expect(savedPizza.time).to.be.equal(Pizza.time);

                // Make a DELETE request to delete the pizza
                chai
                  .request(server)
                  .delete("/api/pizzas/" + savedPizza._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    // Assert that the response status is 200 and the pizza was successfully deleted
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Pizza was successfully deleted."
                    );
                    done();
                  });
              });
          });
      });
  });

  // Test for invalid user input
  it("invalid user input test", (done) => {
    // Define a new user with invalid input
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123", //Faulty password - Joi/validation should catch this...
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 400 and the response body is an object
        expect(res.status).to.be.equal(400); //normal expect with no custom output message
        //expect(res.status,"Status is not 400 (NOT FOUND)").to.be.equal(400); //custom output message at fail

        expect(res.body).to.be.a("object");
        //expect(res.body.error.message).to.be.equal("\"password\" length must be at least 6 characters long");
        done();
      });
  });
});
