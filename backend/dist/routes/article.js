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
// Read specific document by slug - GET
router.get("/:slug", (req, res) => {
    article_1.default.findOne({ slug: req.params.slug })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific document by slug - PUT
router.put("/:slug", validation_1.verifyToken, (req, res) => {
    const slug = req.params.slug;
    article_1.default.findOneAndUpdate({ slug }, req.body, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with slug=${slug}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was successfully updated." });
        }
    })
        .catch((err) => {
        res
            .status(500)
            .send({ message: `Error updating document with slug=${slug}` });
    });
});
// Delete specific document by slug - DELETE
router.delete("/:slug", validation_1.verifyToken, (req, res) => {
    const slug = req.params.slug;
    article_1.default.findOneAndDelete({ slug })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete document with slug=${slug}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was successfully deleted." });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: `Error deleting document with slug=${slug}`,
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
            thumbnail: element.metadata.thumbnail,
            length: element.metadata.length,
        },
        content: {
            text: element.content.text,
            img: element.content.img,
        },
        title: element.title,
        slug: element.slug,
    };
}
exports.default = router;
