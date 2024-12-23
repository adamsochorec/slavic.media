"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var article_1 = require("../models/article");
var validation_1 = require("../validation");
var router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, function (req, res) {
    var data = req.body;
    article_1.default
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
    article_1.default
        .aggregate([
        {
            $lookup: {
                from: "employees",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            },
        },
        {
            $unwind: "$authorDetails",
        },
        {
            $project: {
                _id: 1,
                title: 1,
                metadata: 1,
                author: {
                    _id: "$authorDetails._id",
                    name: "$authorDetails.name",
                    linkedin: "$authorDetails.linkedin",
                },
            },
        },
    ])
        .then(function (data) {
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Get the latest article by date - GET
router.get("/latest", function (req, res) {
    article_1.default
        .aggregate([
        {
            $lookup: {
                from: "employees",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            },
        },
        {
            $unwind: "$authorDetails",
        },
        {
            $project: {
                _id: 1,
                title: 1,
                metadata: 1,
                author: {
                    _id: "$authorDetails._id",
                    name: "$authorDetails.name",
                    linkedin: "$authorDetails.linkedin",
                },
            },
        },
        {
            $sort: { "metadata.date": -1 },
        },
        {
            $limit: 1,
        },
    ])
        .then(function (data) {
        if (data.length > 0) {
            res.send(data[0]);
        }
        else {
            res.status(404).send({ message: "No articles found" });
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read specific document by ID - GET
router.get("/:id", function (req, res) {
    article_1.default
        .aggregate([
        { $match: { _id: req.params.id } },
        {
            $lookup: {
                from: "employees",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            },
        },
        {
            $unwind: "$authorDetails",
        },
        {
            $project: {
                _id: 1,
                title: 1,
                metadata: 1,
                content: 1,
                videos: 1,
                author: {
                    _id: "$authorDetails._id",
                    name: "$authorDetails.name",
                    department: "$authorDetails.department",
                    linkedin: "$authorDetails.linkedin",
                },
            },
        },
    ])
        .then(function (data) {
        res.send(data[0]);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Get the latest article by date - GET
router.get("/latest", function (req, res) {
    article_1.default
        .aggregate([
        {
            $lookup: {
                from: "employees",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            },
        },
        {
            $unwind: "$authorDetails",
        },
        {
            $project: {
                _id: 1,
                title: 1,
                metadata: 1,
                content: 1,
                videos: 1,
                author: {
                    _id: "$authorDetails._id",
                    name: "$authorDetails.name",
                    linkedin: "$authorDetails.linkedin",
                },
            },
        },
        {
            $sort: { "metadata.date": -1 },
        },
        {
            $limit: 1,
        },
    ])
        .then(function (data) {
        res.send(data[0]);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update document - PUT
router.put("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    var updatedArticle = req.body;
    article_1.default
        .findByIdAndUpdate(id, updatedArticle, { new: true })
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
    article_1.default
        .findByIdAndDelete(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete document with id=".concat(id, ". Maybe document was not found!"),
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
    article_1.default
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
