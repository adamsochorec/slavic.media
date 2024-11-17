"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ARTICLE.TS-1 CONTEXT
const express_1 = require("express");
const article_1 = __importDefault(require("../models/article"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// CRUD operations
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    article_1.default.create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", (req, res) => {
    article_1.default.find()
        .then((data) => {
        res.send(mapArray(data));
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", (req, res) => {
    article_1.default.findById(req.params.id)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific document by ID - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedArticle = req.body;
    article_1.default.findByIdAndUpdate(id, updatedArticle, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was successfully updated." });
        }
    })
        .catch((err) => {
        res
            .status(500)
            .send({ message: `Error updating document with id=${id}` });
    });
});
// Delete specific document by ID - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const id = req.params;
    article_1.default.findOneAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was successfully deleted." });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: `Error deleting document with id=${id}`,
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
        id: element._id,
        author: {
            thumbnail: element.author.thumbnail,
            name: element.author.name,
            url: element.author.url,
        },
        metadata: {
            date: element.metadata.date,
            keywords: element.metadata.keywords,
            linkedin: element.metadata.linkedin,
            thumbnail: element.metadata.thumbnail,
            length: element.metadata.length,
        },
        content: element.content,
        title: element.title,
    };
}
exports.default = router;
