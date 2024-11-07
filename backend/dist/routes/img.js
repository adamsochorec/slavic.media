"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const img_1 = __importDefault(require("../models/img"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// CRUD operations
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    img_1.default
        .create(data)
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
        res.send(data);
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
// Add image to specific column - POST
router.post("/:gallery/:column", validation_1.verifyToken, (req, res) => {
    const { gallery, column } = req.params;
    const newImage = req.body;
    img_1.default
        .findOneAndUpdate({ [`${gallery}.${column}`]: { $exists: true } }, { $push: { [`${gallery}.${column}`]: newImage } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot add image to ${gallery}.${column}. Maybe gallery or column was not found!`,
            });
        }
        else {
            res.send(data);
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific image in column - PUT
router.put("/:gallery/:column/:imageId", validation_1.verifyToken, (req, res) => {
    const { gallery, column, imageId } = req.params;
    const updatedImage = req.body;
    img_1.default
        .findOneAndUpdate({ [`${gallery}.${column}.id`]: imageId }, { $set: { [`${gallery}.${column}.$`]: updatedImage } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update image in ${gallery}.${column} with id=${imageId}. Maybe image was not found!`,
            });
        }
        else {
            res.send(data);
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete specific image in column - DELETE
router.delete("/:gallery/:column/:imageId", validation_1.verifyToken, (req, res) => {
    const { gallery, column, imageId } = req.params;
    img_1.default
        .findOneAndUpdate({ [`${gallery}.${column}.id`]: imageId }, { $pull: { [`${gallery}.${column}`]: { id: imageId } } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete image in ${gallery}.${column} with id=${imageId}. Maybe image was not found!`,
            });
        }
        else {
            res.send(data);
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
