"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var eventSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    date: { type: Date, required: true },
    event: { type: String, required: true, maxlength: 500 },
    lat: { type: Number, required: true, maxlength: 500 },
    lng: { type: Number, required: true, maxlength: 500 },
    icon: { type: String, required: true, maxlength: 50 },
});
var eventModel = mongoose_1.default.model("Event", eventSchema);
exports.default = eventModel;
