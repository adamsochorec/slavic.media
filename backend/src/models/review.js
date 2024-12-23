"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    _id: { type: Number, required: true },
    img: { type: String, required: true, maxlength: 100 },
    name: { type: String, required: true, maxlength: 50 },
    role: { type: String, required: true, maxlength: 50 },
    profileLink: { type: String, required: true, maxlength: 100 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    fullReview: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 1000 },
});
var review = mongoose_1.default.model("Review", reviewSchema);
exports.default = review;
