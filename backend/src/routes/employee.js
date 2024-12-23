"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employee_1 = require("../models/employee");
var validation_1 = require("../validation");
var router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, function (req, res) {
    var data = req.body;
    employee_1.default
        .create(data)
        .then(function (insertedData) {
        res.status(201).send(insertedData);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read all documents - GET
router.get("/", function (req, res) {
    var fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    employee_1.default
        .find({}, fields)
        .then(function (data) {
        data.sort(function (a, b) { return a.index - b.index; });
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", function (req, res) {
    var fields = typeof req.query.fields === "string"
        ? req.query.fields.split(",").join(" ")
        : "";
    employee_1.default
        .findById(req.params.id, fields)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update document - PUT
router.put("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    var updatedEmployee = req.body;
    employee_1.default
        .findByIdAndUpdate(id, updatedEmployee, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update document with id=".concat(id, ". Maybe document was not found!"),
            });
        }
        else {
            res.send(data);
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete document - DELETE
router.delete("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    employee_1.default
        .findByIdAndDelete(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update document with id=".concat(id, ". Maybe document was not found!"),
            });
        }
        else {
            res.send({ message: "Document was deleted successfully!" });
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete all documents - DELETE
router.delete("/", validation_1.verifyToken, function (req, res) {
    employee_1.default
        .deleteMany({})
        .then(function (result) {
        res.send({
            message: "".concat(result.deletedCount, " documents were deleted successfully!"),
        });
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
