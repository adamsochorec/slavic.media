// Import necessary libraries
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../server");
const chai = require("chai");

// Use chaiHttp for making HTTP requests in tests
chai.use(chaiHttp);

// Describe the group of tests
describe("Pizza workflow tests", () => {
  // Test for creating a pizza
  it("Register + login a user, create document and verify 1 in DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 200 and the response body is an object with no errors
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // Make a POST request to login the user
        chai
          .request(server)
          .post("/user/login")
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
            // filepath: /Users/adamsochorec/Library/Mobile Documents/com~apple~CloudDocs/Programming/slavic.media/backend/src/test/04_workflow.test.js
            const expect = chai.expect;
            chai.use(chaiHttp);

            describe("CRUD workflow tests for all models", () => {
              let token;

              // Helper to register and login a user, returns a promise with token
              function registerAndLoginUser() {
                const user = {
                  name: "Test User",
                  email: "testuser" + Math.random() + "@mail.com",
                  password: "123456",
                };
                return new Promise((resolve) => {
                  chai
                    .request(server)
                    .post("/user/register")
                    .send(user)
                    .end(() => {
                      chai
                        .request(server)
                        .post("/user/login")
                        .send({ email: user.email, password: user.password })
                        .end((err, res) => {
                          resolve(res.body.data.token);
                        });
                    });
                });
              }

              before(async () => {
                token = await registerAndLoginUser();
              });

              it("CRUD Employee", (done) => {
                const employee = {
                  _id: "emp1",
                  index: 1,
                  name: "John Doe",
                  department: "Engineering",
                  description: "Backend Developer",
                  flag: "us",
                  email: "john.doe@example.com",
                  birthday: "1990-01-01T00:00:00.000Z",
                  linkedin: "john-linkedin",
                  github: "john-github",
                };
                chai
                  .request(server)
                  .post("/employee")
                  .set({ "auth-token": token })
                  .send(employee)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/employee/" + employee._id)
                      .set({ "auth-token": token })
                      .send({ ...employee, name: "Jane Doe" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.name).to.be.equal("Jane Doe");
                        chai
                          .request(server)
                          .delete("/employee/" + employee._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Event", (done) => {
                const event = {
                  date: "2024-01-01T00:00:00.000Z",
                  description: "New Year Event",
                  lat: 50.1,
                  lng: 14.4,
                  icon: "star",
                };
                chai
                  .request(server)
                  .post("/event")
                  .set({ "auth-token": token })
                  .send(event)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    const id = res.body._id;
                    chai
                      .request(server)
                      .put("/event/" + id)
                      .set({ "auth-token": token })
                      .send({ ...event, description: "Updated Event" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.description).to.be.equal("Updated Event");
                        chai
                          .request(server)
                          .delete("/event/" + id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Review", (done) => {
                const review = {
                  _id: Math.floor(Math.random() * 100000),
                  img: "img.jpg",
                  name: "Alice",
                  occupation: "Designer",
                  profileLink: "http://profile.com/alice",
                  rating: 5,
                  fullReview: "Great job!",
                  message: "Loved the service.",
                };
                chai
                  .request(server)
                  .post("/review")
                  .set({ "auth-token": token })
                  .send(review)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/review/" + review._id)
                      .set({ "auth-token": token })
                      .send({ ...review, name: "Alice Updated" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.name).to.be.equal("Alice Updated");
                        chai
                          .request(server)
                          .delete("/review/" + review._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Slide", (done) => {
                const slide = {
                  _id: "slide1",
                  log: "slide-log",
                };
                chai
                  .request(server)
                  .post("/slide")
                  .set({ "auth-token": token })
                  .send(slide)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/slide/" + slide._id)
                      .set({ "auth-token": token })
                      .send({ ...slide, log: "updated-log" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.log).to.be.equal("updated-log");
                        chai
                          .request(server)
                          .delete("/slide/" + slide._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Reel", (done) => {
                const reel = {
                  _id: "reel1",
                  log: "reel-log",
                };
                chai
                  .request(server)
                  .post("/reel")
                  .set({ "auth-token": token })
                  .send(reel)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/reel/" + reel._id)
                      .set({ "auth-token": token })
                      .send({ ...reel, log: "updated-reel-log" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.log).to.be.equal("updated-reel-log");
                        chai
                          .request(server)
                          .delete("/reel/" + reel._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Gallery", (done) => {
                const gallery = {
                  _id: "gallery1",
                  index: 1,
                  description: "Gallery description",
                  title: "Gallery Title",
                  columns: [[]],
                };
                chai
                  .request(server)
                  .post("/img")
                  .set({ "auth-token": token })
                  .send(gallery)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/img/" + gallery._id)
                      .set({ "auth-token": token })
                      .send({ ...gallery, title: "Updated Gallery Title" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.title).to.be.equal("Updated Gallery Title");
                        chai
                          .request(server)
                          .delete("/img/" + gallery._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });

              it("CRUD Video", (done) => {
                const video = {
                  _id: "video1",
                  index: 1,
                  flag: "cz",
                  title: "Video Title",
                  url: "http://video.com/1",
                  year: "2024",
                  client: { name: "ClientName", url: "http://client.com" },
                  category: "promo",
                };
                chai
                  .request(server)
                  .post("/video")
                  .set({ "auth-token": token })
                  .send(video)
                  .end((err, res) => {
                    expect(res.status).to.be.equal(201);
                    chai
                      .request(server)
                      .put("/video/" + video._id)
                      .set({ "auth-token": token })
                      .send({ ...video, title: "Updated Video Title" })
                      .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.title).to.be.equal("Updated Video Title");
                        chai
                          .request(server)
                          .delete("/video/" + video._id)
                          .set({ "auth-token": token })
                          .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            done();
                          });
                      });
                  });
              });
            });
              });
          });
      });
  });

  // Test for deleting a pizza
  it("Register + login a user, create document and delete it from DB", (done) => {
    // Define a new user
    let user = {
      name: "Gabor Gabor",
      email: "mail@gabor.dk",
      password: "123456",
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 200 and the response body is an object with no errors
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(null);

        // Make a POST request to login the user
        chai
          .request(server)
          .post("/user/login")
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
              name: "Test Test",
              description: "test, test...",
              status: "Done",
              duration: 20,
            };

            // Make a POST request to create a new pizza
            chai
              .request(server)
              .post("/tasks")
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
                  .delete("/tasks/" + savedPizza._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    // Assert that the response status is 200 and the pizza was successfully deleted
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Document was successfully deleted."
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
      .post("/user/register")
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
