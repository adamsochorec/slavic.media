import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

chai.use(chaiHttp);

describe("Article workflow tests", () => {
  let token: string;

  it("should register + login a user, create article and verify 1 in DB", (done) => {
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123456",
    };

    // Register user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err: any, res: any) => {
        if (err) {
          console.error("Registration error:", err);
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.equal(null);

        // Login user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "test@example.com",
            password: "123456",
          })
          .end((err: any, res: any) => {
            if (err) {
              console.error("Login error:", err);
              return done(err);
            }
            console.log("Login response:", res.body); // Log the full login response
            token = res.body.data.token;
            expect(token).to.exist;

            const article = {
              title: "Sample Article",
              author: {
                thumbnail: "https://example.com/author.jpg",
                name: "Slovan S.",
                url: "https://example.com/author",
              },
              metadata: {
                date: new Date(),
                formatedDate: "2024-01-01",
                keywords: ["sample", "article"],
                linkedin: "https://linkedin.com/in/slovan",
                thumbnail: "https://example.com/article.jpg",
                length: 5,
              },
              content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              ],
              videos: [],
            };

            // Create article
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(article)
              .end((err: any, res: any) => {
                if (err) {
                  console.error("Article creation error:", err);
                  return done(err);
                }
                console.log("Article creation response:", res.body); // Log the article creation response
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("object");

                const savedArticle = res.body;
                expect(savedArticle.title).to.be.equal(article.title);
                expect(savedArticle.author.name).to.be.equal(
                  article.author.name
                );
                expect(savedArticle.metadata.date).to.exist;
                expect(savedArticle.content)
                  .to.be.an("array")
                  .that.includes(article.content[0]);

                done();
              });
          });
      });
  });

  it("should register + login a user, create article and delete it from DB", (done) => {
    const user = {
      name: "Slovan",
      email: "test@example.com",
      password: "123456",
    };

    // Register user
    chai
      .request(server)
      .post("/user/register")
      .send(user)
      .end((err: any, res: any) => {
        if (err) {
          console.error("Registration error:", err);
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.equal(null);

        // Login user
        chai
          .request(server)
          .post("/user/login")
          .send({
            email: "test@example.com",
            password: "123456",
          })
          .end((err: any, res: any) => {
            if (err) {
              console.error("Login error:", err);
              return done(err);
            }
            console.log("Login response:", res.body); // Log the full login response
            token = res.body.data.token;
            expect(token).to.exist;

            const article = {
              title: "Sample Article",
              author: {
                thumbnail: "https://example.com/author.jpg",
                name: "Slovan S.",
                url: "https://example.com/author",
              },
              metadata: {
                date: new Date(),
                formatedDate: "2024-01-01",
                keywords: ["sample", "article"],
                linkedin: "https://linkedin.com/in/slovan",
                thumbnail: "https://example.com/article.jpg",
                length: 5,
              },
              content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              ],
              videos: [],
            };

            // Create article
            chai
              .request(server)
              .post("/blog/articles")
              .set({ "auth-token": token })
              .send(article)
              .end((err: any, res: any) => {
                if (err) {
                  console.error("Article creation error:", err);
                  return done(err);
                }
                console.log("Article creation response:", res.body); // Log the article creation response
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("object");

                const savedArticle = res.body;
                expect(savedArticle.title).to.be.equal(article.title);
                expect(savedArticle.author.name).to.be.equal(
                  article.author.name
                );
                expect(savedArticle.metadata.date).to.exist;
                expect(savedArticle.content)
                  .to.be.an("array")
                  .that.includes(article.content[0]);

                // Delete article
                chai
                  .request(server)
                  .delete("/blog/articles/" + savedArticle._id)
                  .set({ "auth-token": token })
                  .end((err: any, res: any) => {
                    if (err) {
                      console.error("Article deletion error:", err);
                      return done(err);
                    }
                    expect(res.status).to.be.equal(200);
                    const actualVal = res.body.message;
                    expect(actualVal).to.be.equal(
                      "Document was deleted successfully!"
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
      .end((err: any, res: any) => {
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
