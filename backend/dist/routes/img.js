"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const img_1 = __importDefault(require("../models/img")); // Document model to interact with the database
const validation_1 = require("../validation"); // Validation function to verify the token
const router = (0, express_1.Router)();
// CRUD operations
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    img_1.default
        .insertMany(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", (req, res) => {
    img_1.default
        .find()
        .then((data) => {
        res.send(mapArray(data));
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", (req, res) => {
    img_1.default
        .findById(req.params.id)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read multiple documents by IDs - POST
router.post("/by-ids", (req, res) => {
    const ids = req.body.ids;
    img_1.default
        .find({ _id: { $in: ids } })
        .then((data) => {
        res.send(mapArray(data));
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific document by ID - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const id = req.params.id;
    img_1.default
        .findByIdAndUpdate(id, req.body, { new: true })
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
    img_1.default
        .findByIdAndDelete(id)
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
        res
            .status(500)
            .send({ message: "Error deleting document with id=" + id, error: err });
    });
});
// Function to map an array of documents to a new format
function mapArray(inputArray) {
    return inputArray.map((element) => mapData(element));
}
// Function to map a single document to a new format
function mapData(element) {
    return {
        id: element._id, // Use _id for custom string ID
        largeURL: element.largeURL,
        thumbnailURL: element.thumbnailURL,
        width: element.width,
        height: element.height,
        flag: element.flag,
        title: element.title,
        alt: element.alt,
        client: element.client,
    };
}
exports.default = router;
