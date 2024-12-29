import mongoose, { Schema, Document } from "mongoose";
import { imageSchema, Image } from "./img";

export interface PhotoGallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  type: string;
  columns: Image[][];
}

export const photoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  type: { type: String, required: true },
  columns: { type: [[imageSchema]], required: true },
});

const PhotoGalleryModel = mongoose.model<PhotoGallery>(
  "PhotoGallery",
  photoGallerySchema
);
export default PhotoGalleryModel;
