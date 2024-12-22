"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_1 = __importDefault(require("../models/article"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// Create document - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    article_1.default
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
    ])
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Get the latest article by date - GET
router.get("/latest", (req, res) => {
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
        .then((data) => {
        if (data.length > 0) {
            res.send(data[0]);
        }
        else {
            res.status(404).send({ message: "No articles found" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Get the latest article by date - GET
router.get("/latest", (req, res) => {
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
        .then((data) => {
        res.send(data[0]);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update document - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedArticle = req.body;
    article_1.default
        .findByIdAndUpdate(id, updatedArticle, { new: true })
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
    article_1.default
        .findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete document with id=${id}. Maybe document was not found!`,
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
    article_1.default
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
