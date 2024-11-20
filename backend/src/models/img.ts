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
  _id: { type: String, required: true },
  alt: { type: String, required: true },
  title: { type: String, required: true },
  flag: { type: String, required: true },
});

const imgGallerySchema = new Schema({
  _id: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true },
  title: { type: String, required: true },
  columns: { type: [[imgSchema]], required: true },
});

const imgGallery = mongoose.model<imgGallery>("Img Gallery", imgGallerySchema);
export default imgGallery;
