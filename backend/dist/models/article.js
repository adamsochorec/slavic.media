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
// Schema corresponding to the document interface.
const articleSchema = new mongoose_1.Schema({
    author: {
        thumbnail: { type: String, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
    },
    metadata: {
        date: { type: String, required: true },
        keywords: { type: [String], required: true },
        linkedin: { type: String, required: false },
        facebook: { type: String, required: false },
        thumbnail: { type: String, required: true },
        length: { type: Number, required: true },
    },
    content: {
        text: { type: [String], required: true },
        img: { type: [String], required: false },
        iframe: { type: [String], required: false },
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
});
// Middleware to generate slug before saving
articleSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
    next();
});
// Create a Model
const Article = mongoose_1.default.model("Article", articleSchema);
exports.default = Article;
