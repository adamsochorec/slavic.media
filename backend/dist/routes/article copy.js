"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = require("express");
const article_1 = __importDefault(require("../models/article")); // Article model to interact with the database
const validation_1 = require("../validation"); // Validation function to verify the token
// Express router to define the routes
const router = (0, express_1.Router)();
// CRUD operations
// Create article - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    // Extract data from the request body
    const data = req.body;
    // Insert new article data into the database
    // If the insertion is successful, return the inserted data with a 201 status code
    // If there is an error, return the error message with a 500 status code
    article_1.default.insertMany(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", 
/* verifyToken,  */ (req, res) => {
    // Retrieve all documents from the database
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    article_1.default.find()
        .then((data) => {
        res.send(mapArray(data));
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", 
/* verifyToken,  */ (req, res) => {
    // Retrieve a specific article by its ID
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    article_1.default.findById(req.params.id)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific article by ID - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    // Extract article ID from the request parameters
    const id = req.params.id;
    // Update the article with the provided ID using the request body data
    // If the update is successful, return a success message
    // If the article is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    article_1.default.findByIdAndUpdate(id, req.body, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: "Cannot update document with id=" +
                    id +
                    ". Maybe document was not found!",
            });
        }
        else {
            res.send({ message: "Document was successfully updated." });
        }
    })
        .catch((err) => {
        res
            .status(500)
            .send({ message: "Error updating document with id=" + id });
    });
});
// Delete specific document by ID - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const id = req.params.id;
    // Delete the document with the provided ID
    // If the deletion is successful, return a success message
    // If the document is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    article_1.default.findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete document with id=" +
                    id +
                    ". Maybe document was not found!",
            });
        }
        else {
            res.send({ message: "Document was successfully deleted." });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: "Error deleting document with id=" + id,
            error: err,
        });
    });
});
// Function to map an array of documents to a new format
function mapArray(inputArray) {
    return inputArray.map((element) => mapData(element));
}
// Function to map a single document to a new format
function mapData(element) {
    return {
        id: element.id,
        title: element.title,
        content: element.content,
        thumbnail: element.thumbnail,
        author: element.author,
        date: element.date,
    };
}
// Export the router for use in other files
exports.default = router;