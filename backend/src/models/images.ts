import mongoose, { Schema, Document } from "mongoose";

interface images extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

interface photoGallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  columns: images[][];
}

const imagesSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 50 },
});

const photoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  columns: { type: [[imagesSchema]], required: true },
});

const photoGallery = mongoose.model<photoGallery>(
  "PhotoGallery",
  photoGallerySchema
);
export default photoGallery;
