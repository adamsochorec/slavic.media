"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
chai_1.default.use(chai_http_1.default);
describe("Article workflow tests", () => {
    let token;
    it("should register + login a user, create article and verify 1 in DB", (done) => {
        const user = {
            name: "Slovan",
            email: "test@example.com",
            password: "123456",
        };
        // Register user
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            if (err) {
                console.error("Registration error:", err);
                return done(err);
            }
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body.error).to.be.equal(null);
            // Login user
            chai_1.default
                .request(server_1.default)
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
                console.log("Login response:", res.body); // Log the full login response
                token = res.body.data.token;
                (0, chai_1.expect)(token).to.exist;
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
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(article)
                    .end((err, res) => {
                    if (err) {
                        console.error("Article creation error:", err);
                        return done(err);
                    }
                    console.log("Article creation response:", res.body); // Log the article creation response
                    (0, chai_1.expect)(res.status).to.equal(201);
                    (0, chai_1.expect)(res.body).to.be.an("object");
                    const savedArticle = res.body;
                    (0, chai_1.expect)(savedArticle.title).to.be.equal(article.title);
                    (0, chai_1.expect)(savedArticle.author.name).to.be.equal(article.author.name);
                    (0, chai_1.expect)(savedArticle.metadata.date).to.exist;
                    (0, chai_1.expect)(savedArticle.content)
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
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            if (err) {
                console.error("Registration error:", err);
                return done(err);
            }
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body.error).to.be.equal(null);
            // Login user
            chai_1.default
                .request(server_1.default)
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
                console.log("Login response:", res.body); // Log the full login response
                token = res.body.data.token;
                (0, chai_1.expect)(token).to.exist;
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
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(article)
                    .end((err, res) => {
                    if (err) {
                        console.error("Article creation error:", err);
                        return done(err);
                    }
                    console.log("Article creation response:", res.body); // Log the article creation response
                    (0, chai_1.expect)(res.status).to.equal(201);
                    (0, chai_1.expect)(res.body).to.be.an("object");
                    const savedArticle = res.body;
                    (0, chai_1.expect)(savedArticle.title).to.be.equal(article.title);
                    (0, chai_1.expect)(savedArticle.author.name).to.be.equal(article.author.name);
                    (0, chai_1.expect)(savedArticle.metadata.date).to.exist;
                    (0, chai_1.expect)(savedArticle.content)
                        .to.be.an("array")
                        .that.includes(article.content[0]);
                    // Delete article
                    chai_1.default
                        .request(server_1.default)
                        .delete("/blog/articles/" + savedArticle._id)
                        .set({ "auth-token": token })
                        .end((err, res) => {
                        if (err) {
                            console.error("Article deletion error:", err);
                            return done(err);
                        }
                        (0, chai_1.expect)(res.status).to.be.equal(200);
                        const actualVal = res.body.message;
                        (0, chai_1.expect)(actualVal).to.be.equal("Document was deleted successfully!");
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
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            if (err) {
                console.error("Invalid user input error:", err);
                return done(err);
            }
            (0, chai_1.expect)(res.status).to.be.equal(400);
            (0, chai_1.expect)(res.body).to.be.a("object");
            done();
        });
    });
});
