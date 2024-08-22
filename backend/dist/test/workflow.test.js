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
// Import necessary libraries
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
// Use chaiHttp for making HTTP requests in tests
chai_1.default.use(chai_http_1.default);
// Describe the group of tests
describe("Document workflow tests", () => {
    // Test for creating a document
    it("should register + login a user, create document and verify 1 in DB", (done) => {
        // Define a new user
        const user = {
            name: "Slovan",
            email: "test@example.com",
            password: "123456",
        };
        // Make a POST request to register the new user
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            // Assert that the response status is 200 and the response body is an object with no errors
            (0, chai_1.expect)(res.status).to.be.equal(200);
            (0, chai_1.expect)(res.body).to.be.a("object");
            (0, chai_1.expect)(res.body.error).to.be.equal(null);
            // Make a POST request to login the user
            chai_1.default
                .request(server_1.default)
                .post("/user/login")
                .send({
                email: "test@example.com",
                password: "123456",
            })
                .end((err, res) => {
                // Assert that the response status is 200 and the response body has no errors
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.error).to.be.equal(null);
                const token = res.body.data.token;
                // Define a new document
                const document = {
                    title: "Title",
                    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
                    author: "Slovan S.",
                    date: 20240101,
                    thumbnail: "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
                };
                // Make a POST request to create a new document
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(document)
                    .end((err, res) => {
                    // Assert that the response status is 201, the response body is an array with one element, and the saved document matches the input
                    (0, chai_1.expect)(res.status).to.be.equal(201);
                    (0, chai_1.expect)(res.body).to.be.a("array");
                    (0, chai_1.expect)(res.body.length).to.be.eql(1);
                    const savedDocument = res.body[0];
                    (0, chai_1.expect)(savedDocument.title).to.be.equal(document.title);
                    (0, chai_1.expect)(savedDocument.content).to.be.equal(document.content);
                    (0, chai_1.expect)(savedDocument.author).to.be.equal(document.author);
                    (0, chai_1.expect)(savedDocument.date).to.be.equal(document.date);
                    (0, chai_1.expect)(savedDocument.thumbnail).to.be.equal(document.thumbnail);
                    // Make a GET request to verify the document in the database
                    chai_1.default
                        .request(server_1.default)
                        .get("/blog/articles/")
                        .end((err, res) => {
                        // Assert that the response status is 200, the response body is an array with one element
                        (0, chai_1.expect)(res.status).to.be.equal(200);
                        (0, chai_1.expect)(res.body).to.be.a("array");
                        (0, chai_1.expect)(res.body.length).to.be.eql(1);
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
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            // Assert that the response status is 200 and the response body is an object with no errors
            (0, chai_1.expect)(res.status).to.be.equal(200);
            (0, chai_1.expect)(res.body).to.be.a("object");
            (0, chai_1.expect)(res.body.error).to.be.equal(null);
            // Make a POST request to login the user
            chai_1.default
                .request(server_1.default)
                .post("/user/login")
                .send({
                email: "test@example.com",
                password: "123456",
            })
                .end((err, res) => {
                // Assert that the response status is 200 and the response body has no errors
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.error).to.be.equal(null);
                const token = res.body.data.token;
                // Define a new document
                const document = {
                    title: "Title",
                    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam dolore possimus repellendus ipsa dolor, ea expedita quidem minus voluptatibus officiis nisi veniam fuga! Officiis maiores velit ab, nam perferendis laborum.",
                    author: "Slovan S.",
                    date: 20240101,
                    thumbnail: "https://img.delicious.com.au/WqbvXLhs/del/2016/06/more-the-merrier-31380-2.jpg",
                };
                // Make a POST request to create a new document
                chai_1.default
                    .request(server_1.default)
                    .post("/blog/articles")
                    .set({ "auth-token": token })
                    .send(document)
                    .end((err, res) => {
                    // Assert that the response status is 201, the response body is an array with one element, and the saved document matches the input
                    (0, chai_1.expect)(res.status).to.be.equal(201);
                    (0, chai_1.expect)(res.body).to.be.a("array");
                    (0, chai_1.expect)(res.body.length).to.be.eql(1);
                    const savedDocument = res.body[0];
                    (0, chai_1.expect)(savedDocument.title).to.be.equal(document.title);
                    (0, chai_1.expect)(savedDocument.content).to.be.equal(document.content);
                    (0, chai_1.expect)(savedDocument.author).to.be.equal(document.author);
                    (0, chai_1.expect)(savedDocument.date).to.be.equal(document.date);
                    (0, chai_1.expect)(savedDocument.thumbnail).to.be.equal(document.thumbnail);
                    // Make a DELETE request to delete the document
                    chai_1.default
                        .request(server_1.default)
                        .delete("/blog/articles/" + savedDocument._id)
                        .set({ "auth-token": token })
                        .end((err, res) => {
                        // Assert that the response status is 200 and the document was successfully deleted
                        (0, chai_1.expect)(res.status).to.be.equal(200);
                        const actualVal = res.body.message;
                        (0, chai_1.expect)(actualVal).to.be.equal("Document was successfully deleted.");
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
        chai_1.default
            .request(server_1.default)
            .post("/user/register")
            .send(user)
            .end((err, res) => {
            // Assert that the response status is 400 and the response body is an object
            (0, chai_1.expect)(res.status).to.be.equal(400); // normal expect with no custom output message
            (0, chai_1.expect)(res.body).to.be.a("object");
            // expect(res.body.error.message).to.be.equal("\"password\" length must be at least 6 characters long");
            done();
        });
    });
});
