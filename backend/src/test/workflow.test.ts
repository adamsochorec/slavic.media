// Import necessary libraries
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

// Use chaiHttp for making HTTP requests in tests
chai.use(chaiHttp);

// Describe the group of tests
describe("Document workflow tests", () => {
  let token: string;
  // Test for creating a document
  it("should register + login a user, create document and verify 1 in DB", (done) => {
    // Define a new user
    const user = {
      name: "Slovan",
      email: "test@example.com",
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
            email: user.email,
            password: user.password,
          })
          .end((err, res) => {
            // Assert that the response status is 200 and the response body has no errors
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.a("object");
            expect(res.body.token).to.exist;
            token = res.body.data.token;

            // Define a new document
            const document = {
              title: "Title",
              content:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
              author: "Slovan S.",
              date: 20240101,
              thumbnail:
                "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
            };

            // Make a POST request to create a new document
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(document)
              .end((err, res) => {
                // Assert that the response status is 201, the response body is an array with one element, and the saved document matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                const savedDocument = res.body[0];
                expect(savedDocument.title).to.be.equal(document.title);
                expect(savedDocument.content).to.be.equal(document.content);
                expect(savedDocument.author).to.be.equal(document.author);
                expect(savedDocument.date).to.be.equal(document.date);
                expect(savedDocument.thumbnail).to.be.equal(document.thumbnail);

                // Make a GET request to verify the document in the database
                chai
                  .request(server)
                  .get("/blog/articles/")
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

  // Test for deleting a document
  it("should register + login a user, create document and delete it from DB", (done) => {
    // Define a new user
    const user = {
      name: "Slovan",
      email: "test@example.com",
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
            email: "test@example.com",
            password: "123456",
          })
          .end((err, res) => {
            // Assert that the response status is 200 and the response body has no errors
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(null);
            const token = res.body.data.token;

            // Define a new document
            const document = {
              title: "Title",
              content:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
              author: "Slovan S.",
              date: 20240101,
              thumbnail:
                "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
            };

            // Make a POST request to create a new document
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(document)
              .end((err, res) => {
                // Assert that the response status is 201, the response body is an array with one element, and the saved document matches the input
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.eql(1);

                const savedDocument = res.body[0];
                expect(savedDocument.title).to.be.equal(document.title);
                expect(savedDocument.content).to.be.equal(document.content);
                expect(savedDocument.author).to.be.equal(document.author);
                expect(savedDocument.date).to.be.equal(document.date);
                expect(savedDocument.thumbnail).to.be.equal(document.thumbnail);

                // Make a DELETE request to delete the document
                chai
                  .request(server)
                  .delete("/blog/articles/" + savedDocument._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    // Assert that the response status is 200 and the document was successfully deleted
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
  it("Invalid user input test", (done) => {
    // Define a new user with invalid input
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123", // Faulty password - Joi/validation should catch this...
    };

    // Make a POST request to register the new user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        // Assert that the response status is 400 and the response body is an object
        expect(res.status).to.be.equal(400); // normal expect with no custom output message

        expect(res.body).to.be.a("object");
        // expect(res.body.error.message).to.be.equal("\"password\" length must be at least 6 characters long");
        done();
      });
  });
});
