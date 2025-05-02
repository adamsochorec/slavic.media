"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var imagesSchema = new mongoose_1.Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 50 },
});
var photoGallerySchema = new mongoose_1.Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  type: { type: String, required: true },
  columns: { type: [[imagesSchema]], required: true },
});
var photoGallery = mongoose_1.default.model("photoGallery", photoGallerySchema);
exports.default = photoGallery;
