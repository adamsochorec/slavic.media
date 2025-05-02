import mongoose, { Schema, Document } from "mongoose";
import { imgSchema, img } from "./img";

export interface photoGallery extends Document {
  _id: string;
  index: number;
  description: string;
  title: string;
  columns: img[][];
}

export const photoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  columns: { type: [[imgSchema]], required: true },
});

const photoGalleryModel = mongoose.model<photoGallery>(
  "photoGallery",
  photoGallerySchema
);
export default photoGalleryModel;
