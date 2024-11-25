"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_1 = __importDefault(require("../models/event"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    event_1.default
        .create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all document - GET
router.get("/", (req, res) => {
    event_1.default
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
    event_1.default
        .findById(req.params.id)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update document - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;
    event_1.default
        .findByIdAndUpdate(id, updatedEvent, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
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
// Delete document - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    event_1.default
        .findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update document with id=${id}. Maybe document was not found!`,
            });
        }
        else {
            res.send({ message: "Document was deleted successfully!" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
