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
describe("Document workflow tests", () => {
    let token;
    it("should register + login a user, create document and verify 1 in DB", (done) => {
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
                const document = {
                    title: "Title",
                    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
                    author: "Slovan S.",
                    date: 20240101,
                    thumbnail: "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
                };
                // Create document
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(document)
                    .end((err, res) => {
                    if (err) {
                        console.error("Document creation error:", err);
                        return done(err);
                    }
                    console.log("Document creation response:", res.body); // Log the document creation response
                    (0, chai_1.expect)(res.status).to.equal(201);
                    (0, chai_1.expect)(res.body).to.be.an("array");
                    (0, chai_1.expect)(res.body.length).to.be.eql(1);
                    const savedDocument = res.body[0];
                    (0, chai_1.expect)(savedDocument.title).to.be.equal(document.title);
                    (0, chai_1.expect)(savedDocument.content).to.be.equal(document.content);
                    (0, chai_1.expect)(savedDocument.author).to.be.equal(document.author);
                    (0, chai_1.expect)(savedDocument.date).to.be.equal(document.date);
                    (0, chai_1.expect)(savedDocument.thumbnail).to.be.equal(document.thumbnail);
                    done();
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
                const document = {
                    title: "Title",
                    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
                    author: "Slovan S.",
                    date: 20240101,
                    thumbnail: "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
                };
                // Create document
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(document)
                    .end((err, res) => {
                    if (err) {
                        console.error("Document creation error:", err);
                        return done(err);
                    }
                    console.log("Document creation response:", res.body); // Log the document creation response
                    (0, chai_1.expect)(res.status).to.equal(201);
                    (0, chai_1.expect)(res.body).to.be.an("array");
                    (0, chai_1.expect)(res.body.length).to.be.eql(1);
                    const savedDocument = res.body[0];
                    (0, chai_1.expect)(savedDocument.title).to.be.equal(document.title);
                    (0, chai_1.expect)(savedDocument.content).to.be.equal(document.content);
                    (0, chai_1.expect)(savedDocument.author).to.be.equal(document.author);
                    (0, chai_1.expect)(savedDocument.date).to.be.equal(document.date);
                    (0, chai_1.expect)(savedDocument.thumbnail).to.be.equal(document.thumbnail);
                    // Delete document
                    chai_1.default
                        .request(server_1.default)
                        .delete("/blog/articles/" + savedDocument._id)
                        .set({ "auth-token": token })
                        .end((err, res) => {
                        if (err) {
                            console.error("Document deletion error:", err);
                            return done(err);
                        }
                        (0, chai_1.expect)(res.status).to.be.equal(200);
                        const actualVal = res.body.message;
                        (0, chai_1.expect)(actualVal).to.be.equal("Document was successfully deleted.");
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
