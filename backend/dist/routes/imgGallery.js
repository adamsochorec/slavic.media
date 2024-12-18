"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const imgGallery_1 = __importDefault(require("../models/imgGallery"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// Helper function to convert string IDs to ObjectId
const convertToObjectId = (columns) => {
    if (!Array.isArray(columns)) {
        throw new TypeError("columns must be an array of arrays");
    }
    return columns.map((column) => {
        if (!Array.isArray(column)) {
            throw new TypeError("Each column must be an array");
        }
        return column.map((id) => new mongoose_1.default.Types.ObjectId(id));
    });
};
// Create gallery - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    try {
        console.log("Received data:", JSON.stringify(req.body, null, 2)); // Log the received data
        const data = req.body;
        if (!data.columns) {
            throw new Error("columns field is required");
        }
        data.columns = convertToObjectId(data.columns);
        imgGallery_1.default
            .create(data)
            .then((insertedData) => {
            res.status(201).send(insertedData);
        })
            .catch((err) => {
            res.status(500).send({ message: err.message });
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});
// Read all galleries - GET
router.get("/", (req, res) => {
    const { type } = req.query; // Get the type from query parameters
    const filter = type ? { type } : {}; // Filter by type if provided
    imgGallery_1.default
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
    imgGallery_1.default
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
    try {
        const { id } = req.params;
        const updatedGallery = req.body;
        if (!updatedGallery.columns) {
            throw new Error("columns field is required");
        }
        updatedGallery.columns = convertToObjectId(updatedGallery.columns);
        imgGallery_1.default
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
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});
// Delete gallery - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    imgGallery_1.default
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
    imgGallery_1.default
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
exports.default = router;
