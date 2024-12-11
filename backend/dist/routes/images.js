"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = __importDefault(require("../models/images"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// CRUD operations for galleries
// Create gallery - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    images_1.default
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
    const { type } = req.query; // Get the type from query parameters
    const filter = type ? { type } : {}; // Filter by type if provided
    images_1.default
        .find(filter)
        .then((data) => {
        data.sort((a, b) => a.index - b.index);
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific gallery by ID - GET
router.get("/:id", (req, res) => {
    images_1.default
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
    images_1.default
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
    images_1.default
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
// Delete all galleries - DELETE
router.delete("/", validation_1.verifyToken, (req, res) => {
    images_1.default
        .deleteMany({})
        .then((result) => {
        res.send({
            message: `${result.deletedCount} galleries were deleted successfully!`,
        });
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
    images_1.default
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
    images_1.default
        .findOneAndUpdate({ _id: galleryId }, { $set: { [`columns.${parseInt(columnIndex)}`]: updatedColumn } }, { new: true })
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
    images_1.default
        .findOneAndUpdate({ _id: galleryId }, { $unset: { [`columns.${parseInt(columnIndex)}`]: 1 } }, { new: true })
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
// Add image to specific column in gallery - POST
router.post("/:galleryId/:columnIndex", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex } = req.params;
    const newImg = req.body;
    images_1.default
        .findByIdAndUpdate(galleryId, { $push: { [`columns.${parseInt(columnIndex)}`]: newImg } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot add image to column ${columnIndex}. Maybe gallery or column was not found!`,
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
// Read specific image in column - GET
router.get("/:galleryId/:columnIndex/:imageId", (req, res) => {
    const { galleryId, columnIndex, imageId } = req.params;
    images_1.default
        .findById(galleryId)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot find gallery with id=${galleryId}.`,
            });
        }
        else {
            const column = data.columns[parseInt(columnIndex)];
            if (!column) {
                res.status(404).send({
                    message: `Cannot find column ${columnIndex} in gallery with id=${galleryId}.`,
                });
            }
            else {
                const image = column.find((image) => image._id === imageId);
                if (!image) {
                    res.status(404).send({
                        message: `Cannot find image with id=${imageId} in column ${columnIndex}.`,
                    });
                }
                else {
                    res.send(image);
                }
            }
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific image in column - PUT
router.put("/:galleryId/:columnIndex/:imageId", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex, imageId } = req.params;
    const updatedImg = req.body;
    images_1.default
        .findOneAndUpdate({ _id: galleryId, [`columns.${parseInt(columnIndex)}._id`]: imageId }, { $set: { [`columns.${parseInt(columnIndex)}.$`]: updatedImg } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update image in column ${columnIndex} with id=${imageId}. Maybe image was not found!`,
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
router.delete("/:galleryId/:columnIndex/:imageId", validation_1.verifyToken, (req, res) => {
    const { galleryId, columnIndex, imageId } = req.params;
    images_1.default
        .findOneAndUpdate({ _id: galleryId, [`columns.${parseInt(columnIndex)}._id`]: imageId }, { $pull: { [`columns.${parseInt(columnIndex)}`]: { _id: imageId } } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete image in column ${columnIndex} with id=${imageId}. Maybe image was not found!`,
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
// Read specific column by index - GET
router.get("/:galleryId/:columnIndex", (req, res) => {
    const { galleryId, columnIndex } = req.params;
    images_1.default
        .findById(galleryId)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot find gallery with id=${galleryId}.`,
            });
        }
        else {
            const column = data.columns[parseInt(columnIndex)];
            if (!column) {
                res.status(404).send({
                    message: `Cannot find column ${columnIndex} in gallery with id=${galleryId}.`,
                });
            }
            else {
                res.send(column);
            }
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
