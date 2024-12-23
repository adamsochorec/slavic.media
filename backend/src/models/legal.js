"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var legalSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    title: { type: String, required: true, maxlength: 200 },
    date: { type: Date, required: true },
    content: { type: [String], required: true },
});
var legal = mongoose_1.default.model("Legal", legalSchema);
exports.default = legal;
