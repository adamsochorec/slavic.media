"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var video_1 = require("./video");
var articleSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 100 },
    title: { type: String, required: true, maxlength: 200 },
    author: { type: String, ref: "Employee", required: true },
    metadata: {
        date: { type: Date, required: true },
        flag: { type: String, required: false, maxlength: 2 },
        formatedDate: { type: String, required: true, maxlength: 50 },
        keywords: { type: [String], required: true },
        linkedin: { type: String, maxlength: 200 },
        thumbnail: { type: String, required: true, maxlength: 100 },
        icon: { type: String, required: true, maxlength: 50 },
        desc: { type: String, required: true, maxlength: 1000 },
        length: { type: Number, required: true, min: 1 },
    },
    content: { type: [String], required: true },
    videos: { type: [video_1.videoSchema], required: false },
});
var articleModel = mongoose_1.default.model("Article", articleSchema);
exports.default = articleModel;
