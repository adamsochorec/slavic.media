"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_1 = __importDefault(require("../models/video"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
// CRUD operations for video galleries
// Create video gallery - POST
router.post("/", validation_1.verifyToken, (req, res) => {
    const data = req.body;
    video_1.default.create(data)
        .then((insertedData) => {
        res.status(201).send(insertedData);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read all video galleries - GET
router.get("/", (req, res) => {
    video_1.default.find()
        .then((data) => {
        // Sort videos within each gallery
        data.forEach((gallery) => {
            gallery.videos.sort((a, b) => a.index - b.index);
        });
        // Sort galleries
        data.sort((a, b) => a.index - b.index);
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Read specific video gallery by ID - GET
router.get("/:id", (req, res) => {
    video_1.default.findById(req.params.id)
        .then((data) => {
        if (data) {
        }
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update video gallery - PUT
router.put("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    const updatedGallery = req.body;
    video_1.default.findByIdAndUpdate(id, updatedGallery, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update video gallery with id=${id}. Maybe gallery was not found!`,
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
// Delete video gallery - DELETE
router.delete("/:id", validation_1.verifyToken, (req, res) => {
    const { id } = req.params;
    video_1.default.findByIdAndDelete(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete video gallery with id=${id}. Maybe gallery was not found!`,
            });
        }
        else {
            res.send({ message: "Video gallery was deleted successfully!" });
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Delete all video galleries - DELETE
router.delete("/", validation_1.verifyToken, (req, res) => {
    video_1.default.deleteMany({})
        .then((result) => {
        res.send({
            message: `${result.deletedCount} video galleries were deleted successfully!`,
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// CRUD operations for videos
// Add video to gallery - POST
router.post("/:galleryId", validation_1.verifyToken, (req, res) => {
    const { galleryId } = req.params;
    const newVideo = req.body;
    video_1.default.findByIdAndUpdate(galleryId, { $push: { videos: newVideo } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot add video to gallery. Maybe gallery was not found!`,
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
// Read specific video in gallery - GET
router.get("/:galleryId/:videoId", (req, res) => {
    const { galleryId, videoId } = req.params;
    video_1.default.findById(galleryId)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot find gallery with id=${galleryId}.`,
            });
        }
        else {
            const video = data.videos.id(videoId);
            if (!video) {
                res.status(404).send({
                    message: `Cannot find video with id=${videoId} in gallery with id=${galleryId}.`,
                });
            }
            else {
                res.send(video);
            }
        }
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});
// Update specific video in gallery - PUT
router.put("/:galleryId/:videoId", validation_1.verifyToken, (req, res) => {
    const { galleryId, videoId } = req.params;
    const updatedVideo = req.body;
    video_1.default.findOneAndUpdate({ _id: galleryId, "videos._id": videoId }, { $set: { "videos.$": updatedVideo } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update video with id=${videoId} in gallery with id=${galleryId}. Maybe video was not found!`,
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
// Delete specific video in gallery - DELETE
router.delete("/:galleryId/:videoId", validation_1.verifyToken, (req, res) => {
    const { galleryId, videoId } = req.params;
    video_1.default.findOneAndUpdate({ _id: galleryId }, { $pull: { videos: { _id: videoId } } }, { new: true })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete video with id=${videoId} in gallery with id=${galleryId}. Maybe video was not found!`,
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
