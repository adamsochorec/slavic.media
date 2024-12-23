"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var video_1 = require("../models/video");
var validation_1 = require("../validation");
var router = (0, express_1.Router)();
// CRUD operations for video galleries
// Create video gallery - POST
router.post("/", validation_1.verifyToken, function (req, res) {
    var data = req.body;
    video_1.default.create(data)
        .then(function (insertedData) {
        res.status(201).send(insertedData);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read all video galleries - GET
router.get("/", function (req, res) {
    video_1.default.find()
        .then(function (data) {
        // Sort videos within each gallery
        data.forEach(function (gallery) {
            gallery.videos.sort(function (a, b) { return a.index - b.index; });
        });
        // Sort galleries
        data.sort(function (a, b) { return a.index - b.index; });
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Read specific video gallery by ID - GET
router.get("/:id", function (req, res) {
    video_1.default.findById(req.params.id)
        .then(function (data) {
        if (data) {
        }
        res.send(data);
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update video gallery - PUT
router.put("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    var updatedGallery = req.body;
    video_1.default.findByIdAndUpdate(id, updatedGallery, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update video gallery with id=".concat(id, ". Maybe gallery was not found!"),
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
// Delete video gallery - DELETE
router.delete("/:id", validation_1.verifyToken, function (req, res) {
    var id = req.params.id;
    video_1.default.findByIdAndDelete(id)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete video gallery with id=".concat(id, ". Maybe gallery was not found!"),
            });
        }
        else {
            res.send({ message: "Video gallery was deleted successfully!" });
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Delete all video galleries - DELETE
router.delete("/", validation_1.verifyToken, function (req, res) {
    video_1.default.deleteMany({})
        .then(function (result) {
        res.send({
            message: "".concat(result.deletedCount, " video galleries were deleted successfully!"),
        });
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// CRUD operations for videos
// Add video to gallery - POST
router.post("/:galleryId", validation_1.verifyToken, function (req, res) {
    var galleryId = req.params.galleryId;
    var newVideo = req.body;
    video_1.default.findByIdAndUpdate(galleryId, { $push: { videos: newVideo } }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot add video to gallery. Maybe gallery was not found!",
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
// Read specific video in gallery - GET
router.get("/:galleryId/:videoId", function (req, res) {
    var _a = req.params, galleryId = _a.galleryId, videoId = _a.videoId;
    video_1.default.findById(galleryId)
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot find gallery with id=".concat(galleryId, "."),
            });
        }
        else {
            var video = data.videos.id(videoId);
            if (!video) {
                res.status(404).send({
                    message: "Cannot find video with id=".concat(videoId, " in gallery with id=").concat(galleryId, "."),
                });
            }
            else {
                res.send(video);
            }
        }
    })
        .catch(function (err) {
        res.status(500).send({ message: err.message });
    });
});
// Update specific video in gallery - PUT
router.put("/:galleryId/:videoId", validation_1.verifyToken, function (req, res) {
    var _a = req.params, galleryId = _a.galleryId, videoId = _a.videoId;
    var updatedVideo = req.body;
    video_1.default.findOneAndUpdate({ _id: galleryId, "videos._id": videoId }, { $set: { "videos.$": updatedVideo } }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot update video with id=".concat(videoId, " in gallery with id=").concat(galleryId, ". Maybe video was not found!"),
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
// Delete specific video in gallery - DELETE
router.delete("/:galleryId/:videoId", validation_1.verifyToken, function (req, res) {
    var _a = req.params, galleryId = _a.galleryId, videoId = _a.videoId;
    video_1.default.findOneAndUpdate({ _id: galleryId }, { $pull: { videos: { _id: videoId } } }, { new: true })
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete video with id=".concat(videoId, " in gallery with id=").concat(galleryId, ". Maybe video was not found!"),
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
exports.default = router;
