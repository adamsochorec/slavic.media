"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var serviceSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    desc: { type: String, required: true, maxlength: 1000 },
    icon: { type: String, required: true, maxlength: 50 },
});
var service = mongoose_1.default.model("Service", serviceSchema);
exports.default = service;
