"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const videoSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    flag: { type: String, required: true, maxlength: 50 },
    title: { type: String, required: true, maxlength: 200 },
    url: { type: String, required: true, maxlength: 100 },
    year: { type: String, required: true, maxlength: 4 },
    client: { type: String, maxlength: 100 },
});
const videoGallerySchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 50 },
    index: { type: Number, required: true, unique: true },
    desc: { type: String, required: true, maxlength: 1000 },
    title: { type: String, required: true, maxlength: 200 },
    videos: { type: [videoSchema], required: true },
});
const videoGallery = mongoose_1.default.model("VideoGallery", videoGallerySchema);
exports.default = videoGallery;
