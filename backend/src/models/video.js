"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
var mongoose_1 = require("mongoose");
var videoSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    flag: { type: String, required: true, maxlength: 50 },
    title: { type: String, required: true, maxlength: 200 },
    url: { type: String, required: true, maxlength: 100 },
    year: { type: String, required: true, maxlength: 4 },
    client: { type: String, maxlength: 100 },
});
exports.videoSchema = videoSchema;
var videoGallerySchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    desc: { type: String, required: true, maxlength: 1000 },
    title: { type: String, required: true, maxlength: 200 },
    videos: { type: [videoSchema], required: true },
});
var videoGallery = mongoose_1.default.model("VideoGallery", videoGallerySchema);
exports.default = videoGallery;
