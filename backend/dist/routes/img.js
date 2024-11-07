"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const img_1 = __importDefault(require("../models/img"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// CRUD operations for galleries
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
// Update gallery - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedGallery = req.body;
    img_1.default
        .findByIdAndUpdate(id, updatedGallery, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update gallery with id=${id}. Maybe gallery was not found!`,
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
// Delete gallery - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    img_1.default
        .findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete gallery with id=${id}. Maybe gallery was not found!`,
            });
        }
        else {
            res.send({ message: "Gallery was deleted successfully!" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// CRUD operations for columns
// Add column to gallery - POST
router.post("/:galleryId/columns", validation_1.verifyToken, (req, res) => {
    const { galleryId } = req.params;
    const newColumn = req.body;
    img_1.default
        .findByIdAndUpdate(galleryId, { $push: { columns: newColumn } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot add column to gallery with id=${galleryId}. Maybe gallery was not found!`,
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
// Update specific column in gallery - PUT
router.put("/:galleryId/columns/:columnIndex", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex } = req.params;
    const updatedColumn = req.body;
    img_1.default
        .findOneAndUpdate({ _id: galleryId }, { $set: { [`columns.${columnIndex}`]: updatedColumn } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update column ${columnIndex} in gallery with id=${galleryId}. Maybe column was not found!`,
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
// Delete specific column in gallery - DELETE
router.delete("/:galleryId/columns/:columnIndex", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex } = req.params;
    img_1.default
        .findOneAndUpdate({ _id: galleryId }, { $unset: { [`columns.${columnIndex}`]: 1 } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete column ${columnIndex} in gallery with id=${galleryId}. Maybe column was not found!`,
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
// CRUD operations for images
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
