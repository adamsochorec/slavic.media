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
// Create gallery - POST
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
// Read all galleries - GET
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
// Read specific gallery by ID - GET
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
// Add img to specific column in gallery - POST
router.post("/:galleryId/:columnIndex", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex } = req.params;
    const newImg = req.body;
    img_1.default
        .findByIdAndUpdate(galleryId, { $push: { [`columns.${columnIndex}`]: newImg } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot add img to column ${columnIndex}. Maybe gallery or column was not found!`,
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
// Update specific img in column - PUT
router.put("/:galleryId/:columnIndex/:imgId", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex, imgId } = req.params;
    const updatedImg = req.body;
    img_1.default
        .findOneAndUpdate({ _id: galleryId, [`columns.${columnIndex}._id`]: imgId }, { $set: { [`columns.${columnIndex}.$`]: updatedImg } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update img in column ${columnIndex} with id=${imgId}. Maybe img was not found!`,
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
// Delete specific img in column - DELETE
router.delete("/:galleryId/:columnIndex/:imgId", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex, imgId } = req.params;
    img_1.default
        .findOneAndUpdate({ _id: galleryId, [`columns.${columnIndex}._id`]: imgId }, { $pull: { [`columns.${columnIndex}`]: { _id: imgId } } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete img in column ${columnIndex} with id=${imgId}. Maybe img was not found!`,
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
