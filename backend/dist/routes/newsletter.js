"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_1 = __importDefault(require("../models/newsletter"));
const validation_1 = require("../validation");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const router = (0, express_1.Router)();
// Create document - POST
router.post("/", (req, res) => {
    const data = req.body;
    // Get current time in Europe/Prague and convert to UTC by subtracting the offset
    const cetMoment = moment_timezone_1.default.tz("Europe/Prague");
    data.date = new Date(Date.UTC(cetMoment.year(), cetMoment.month(), cetMoment.date(), cetMoment.hour(), cetMoment.minute(), cetMoment.second(), cetMoment.millisecond()));
    newsletter_1.default
        .create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        if (err.code === 11000) {
            res.status(409).send({ message: "Email already subscribed." });
        }
        else {
            res.status(500).send({ message: err.message });
        }
    });
});
// Read all documents - GET
router.get("/", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    newsletter_1.default
        .find({}, fields)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", (req, res) => {
    const fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    newsletter_1.default
        .findById(req.params.id, fields)
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
    const updatedNewsletter = req.body;
    newsletter_1.default
        .findByIdAndUpdate(id, updatedNewsletter, { new: true })
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
    newsletter_1.default
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
// Delete all documents - DELETE
router.delete("/", validation_1.verifyToken, (req, res) => {
    newsletter_1.default
        .deleteMany({})
        .then((result) => {
        res.send({
            message: `${result.deletedCount} documents were deleted successfully!`,
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
