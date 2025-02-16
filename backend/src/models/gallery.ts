import mongoose, { Schema, Document } from "mongoose";
import { imageSchema, image } from "./img";

export interface photoGallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  type: string;
  columns: image[][];
}

export const photoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  type: { type: String, required: true },
  columns: { type: [[imageSchema]], required: true },
});

const photoGalleryModel = mongoose.model<photoGallery>(
  "photoGallery",
  photoGallerySchema
);
export default photoGalleryModel;
