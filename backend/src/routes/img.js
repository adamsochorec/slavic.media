"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var images_1 = require("../models/images");
var validation_1 = require("../validation");
var router = (0, express_1.Router)();
// CRUD operations for galleries
// Create gallery - POST
router.post("/", validation_1.verifyToken, function (req, res) {
    var data = req.body;
    images_1.default
        .create(data)
        .then(function (insertedData) {
        res.status(201).send(insertedData);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read all galleries - GET
router.get("/", function (req, res) {
    var type = req.query.type; // Get the type from query parameters
    var filter = type ? { type: type } : {}; // Filter by type if provided
    images_1.default
        .find(filter)
        .then(function (data) {
        data.sort(function (a, b) { return a.index - b.index; });
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read specific gallery by ID - GET
router.get("/:id", function (req, res) {
    images_1.default
        .findById(req.params.id)
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update gallery - PUT
router.put("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    var updatedGallery = req.body;
    images_1.default
        .findByIdAndUpdate(id, updatedGallery, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update gallery with id=".concat(id, ". Maybe gallery was not found!"),
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
// Delete gallery - DELETE
router.delete("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    images_1.default
        .findByIdAndDelete(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete gallery with id=".concat(id, ". Maybe gallery was not found!"),
            });
        }
        else {
            res.send({ message: "Gallery was deleted successfully!" });
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete all galleries - DELETE
router.delete("/", validation_1.verifyToken, function (req, res) {
    images_1.default
        .deleteMany({})
        .then(function (result) {
        res.send({
            message: "".concat(result.deletedCount, " galleries were deleted successfully!"),
        });
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// CRUD operations for columns
// Add column to gallery - POST
router.post("/:galleryId/columns", validation_1.verifyToken, function (req, res) {
    var galleryId = req.params.galleryId;
    var newColumn = req.body;
    images_1.default
        .findByIdAndUpdate(galleryId, { $push: { columns: newColumn } }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot add column to gallery with id=".concat(galleryId, ". Maybe gallery was not found!"),
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
// Update specific column in gallery - PUT
router.put("/:galleryId/columns/:columnIndex", validation_1.verifyToken, function (req, res) {
    var _a;
    var _b = req.params, galleryId = _b.galleryId, columnIndex = _b.columnIndex;
    var updatedColumn = req.body;
    images_1.default
        .findOneAndUpdate({ _id: galleryId }, { $set: (_a = {}, _a["columns.".concat(parseInt(columnIndex))] = updatedColumn, _a) }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update column ".concat(columnIndex, " in gallery with id=").concat(galleryId, ". Maybe column was not found!"),
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
// Delete specific column in gallery - DELETE
router.delete("/:galleryId/columns/:columnIndex", validation_1.verifyToken, function (req, res) {
    var _a;
    var _b = req.params, galleryId = _b.galleryId, columnIndex = _b.columnIndex;
    images_1.default
        .findOneAndUpdate({ _id: galleryId }, { $unset: (_a = {}, _a["columns.".concat(parseInt(columnIndex))] = 1, _a) }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete column ".concat(columnIndex, " in gallery with id=").concat(galleryId, ". Maybe column was not found!"),
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
// CRUD operations for images
// Add image to specific column in gallery - POST
router.post("/:galleryId/:columnIndex", validation_1.verifyToken, function (req, res) {
    var _a;
    var _b = req.params, galleryId = _b.galleryId, columnIndex = _b.columnIndex;
    var newImg = req.body;
    images_1.default
        .findByIdAndUpdate(galleryId, { $push: (_a = {}, _a["columns.".concat(parseInt(columnIndex))] = newImg, _a) }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot add image to column ".concat(columnIndex, ". Maybe gallery or column was not found!"),
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
// Read specific image in column - GET
router.get("/:galleryId/:columnIndex/:imageId", function (req, res) {
    var _a = req.params, galleryId = _a.galleryId, columnIndex = _a.columnIndex, imageId = _a.imageId;
    images_1.default
        .findById(galleryId)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot find gallery with id=".concat(galleryId, "."),
            });
        }
        else {
            var column = data.columns[parseInt(columnIndex)];
            if (!column) {
                res.status(404).send({
                    message: "Cannot find column ".concat(columnIndex, " in gallery with id=").concat(galleryId, "."),
                });
            }
            else {
                var image = column.find(function (image) { return image._id === imageId; });
                if (!image) {
                    res.status(404).send({
                        message: "Cannot find image with id=".concat(imageId, " in column ").concat(columnIndex, "."),
                    });
                }
                else {
                    res.send(image);
                }
            }
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update specific image in column - PUT
router.put("/:galleryId/:columnIndex/:imageId", validation_1.verifyToken, function (req, res) {
    var _a, _b;
    var _c = req.params, galleryId = _c.galleryId, columnIndex = _c.columnIndex, imageId = _c.imageId;
    var updatedImg = req.body;
    images_1.default
        .findOneAndUpdate((_a = { _id: galleryId }, _a["columns.".concat(parseInt(columnIndex), "._id")] = imageId, _a), { $set: (_b = {}, _b["columns.".concat(parseInt(columnIndex), ".$")] = updatedImg, _b) }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update image in column ".concat(columnIndex, " with id=").concat(imageId, ". Maybe image was not found!"),
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
// Delete specific image in column - DELETE
router.delete("/:galleryId/:columnIndex/:imageId", validation_1.verifyToken, function (req, res) {
    var _a, _b;
    var _c = req.params, galleryId = _c.galleryId, columnIndex = _c.columnIndex, imageId = _c.imageId;
    images_1.default
        .findOneAndUpdate((_a = { _id: galleryId }, _a["columns.".concat(parseInt(columnIndex), "._id")] = imageId, _a), { $pull: (_b = {}, _b["columns.".concat(parseInt(columnIndex))] = { _id: imageId }, _b) }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete image in column ".concat(columnIndex, " with id=").concat(imageId, ". Maybe image was not found!"),
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
// Read specific column by index - GET
router.get("/:galleryId/:columnIndex", function (req, res) {
    var _a = req.params, galleryId = _a.galleryId, columnIndex = _a.columnIndex;
    images_1.default
        .findById(galleryId)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot find gallery with id=".concat(galleryId, "."),
            });
        }
        else {
            var column = data.columns[parseInt(columnIndex)];
            if (!column) {
                res.status(404).send({
                    message: "Cannot find column ".concat(columnIndex, " in gallery with id=").concat(galleryId, "."),
                });
            }
            else {
                res.send(column);
            }
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
exports.default = router;
