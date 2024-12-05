import mongoose, { Schema, Document } from "mongoose";

interface img extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

interface imgGallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  columns: img[][];
}

const imgSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 50 },
});

const imgGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  columns: { type: [[imgSchema]], required: true },
});

const imgGallery = mongoose.model<imgGallery>("ImgGallery", imgGallerySchema);
export default imgGallery;
