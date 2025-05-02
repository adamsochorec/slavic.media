"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var imgSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    alt: { type: String, required: true, maxlength: 200 },
    title: { type: String, required: true, maxlength: 200 },
    flag: { type: String, required: true, maxlength: 2 },
});
var img = mongoose_1.default.model("Img", imgSchema);
exports.default = img;
