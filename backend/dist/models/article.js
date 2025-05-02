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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const video_1 = require("./video");
const articleSchema = new mongoose_1.Schema({
    _id: { type: String, required: true, maxlength: 100 },
    title: { type: String, required: true, maxlength: 200 },
    author: { type: String, ref: "Employee", required: true },
    metadata: {
        date: { type: Date, required: true },
        flag: { type: String, required: false, maxlength: 2 },
        keywords: { type: [String], required: true },
        linkedin: { type: String, maxlength: 200 },
        thumbnail: { type: String, required: true, maxlength: 100 },
        icon: { type: String, required: true, maxlength: 50 },
        description: { type: String, required: true, maxlength: 1000 },
        length: { type: Number, required: true, min: 1 },
    },
    content: { type: [String], required: true },
    videos: { type: [video_1.videoSchema], required: false },
});
const articleModel = mongoose_1.default.model("Article", articleSchema);
exports.default = articleModel;
