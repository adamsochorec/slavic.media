import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

chai.use(chaiHttp);

describe("Document workflow tests", () => {
  let token: string; // Declare the token at the top level

  it("should register + login a user, create document and verify 1 in DB", (done) => {
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123456",
    };

    // Register the user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error("Registration error:", err);
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.equal(null);

        // Login the user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "test@example.com",
            password: "123456",
          })
          .end((err, res) => {
            if (err) {
              console.error("Login error:", err);
              return done(err);
            }
            console.log("Login response:", res.body); // Log the login response
            token = res.body.data.token;
            expect(token).to.exist; // Ensure the token exists

            const document = {
              title: "Title",
              content:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
              author: "Slovan S.",
              date: 20240101,
              thumbnail:
                "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
            };

            // Create the document
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(document)
              .end((err, res) => {
                if (err) {
                  console.error("Document creation error:", err);
                  return done(err);
                }
                console.log("Document creation response:", res.body); // Log the document creation response
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.eql(1);

                const savedDocument = res.body[0];
                expect(savedDocument.title).to.be.equal(document.title);
                expect(savedDocument.content).to.be.equal(document.content);
                expect(savedDocument.author).to.be.equal(document.author);
                expect(savedDocument.date).to.be.equal(document.date);
                expect(savedDocument.thumbnail).to.be.equal(document.thumbnail);

                // Verify the document in the database
                chai
                  .request(server)
                  .get("/blog/articles/")
                  .end((err, res) => {
                    if (err) {
                      console.error("Document verification error:", err);
                      return done(err);
                    }
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.be.eql(1);

                    done();
                  });
              });
          });
      });
  });

  it("should register + login a user, create document and delete it from DB", (done) => {
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123456",
    };

    // Register the user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error("Registration error:", err);
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.equal(null);

        // Login the user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "test@example.com",
            password: "123456",
          })
          .end((err, res) => {
            if (err) {
              console.error("Login error:", err);
              return done(err);
            }
            console.log("Login response:", res.body); // Log the login response
            token = res.body.data.token;
            expect(token).to.exist; // Ensure the token exists

            const document = {
              title: "Title",
              content:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
              author: "Slovan S.",
              date: 20240101,
              thumbnail:
                "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
            };

            // Create the document
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(document)
              .end((err, res) => {
                if (err) {
                  console.error("Document creation error:", err);
                  return done(err);
                }
                console.log("Document creation response:", res.body); // Log the document creation response
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("array");
                expect(res.body.length).to.be.eql(1);

                const savedDocument = res.body[0];
                expect(savedDocument.title).to.be.equal(document.title);
                expect(savedDocument.content).to.be.equal(document.content);
                expect(savedDocument.author).to.be.equal(document.author);
                expect(savedDocument.date).to.be.equal(document.date);
                expect(savedDocument.thumbnail).to.be.equal(document.thumbnail);

                // Delete the document
                chai
                  .request(server)
                  .delete("/blog/articles/" + savedDocument._id)
                  .set({ "auth-token": token })
                  .end((err, res) => {
                    if (err) {
                      console.error("Document deletion error:", err);
                      return done(err);
                    }
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

  it("Invalid user input test", (done) => {
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123", // Faulty password - Joi/validation should catch this...
    };

    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err, res) => {
        if (err) {
          console.error("Invalid user input error:", err);
          return done(err);
        }
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
