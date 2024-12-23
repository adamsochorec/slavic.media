"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var gallerySchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true },
    desc: { type: String, required: true, maxlength: 1000 },
    title: { type: String, required: true, maxlength: 200 },
    type: { type: String, required: true },
    columns: {
        type: [[{ type: String }]],
        required: true,
    },
});
var Gallery = mongoose_1.default.model("Gallery", gallerySchema);
exports.default = Gallery;
