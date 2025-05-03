import mongoose, { Schema, Document } from "mongoose";
import { ImgSchema, Img } from "./img";

export interface PhotoGallery extends Document {
  _id: string;
  index: number;
  description: string;
  title: string;
  columns: Img[][];
}

export const PhotoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  columns: { type: [[ImgSchema]], required: true },
});

const PhotoGalleryModel = mongoose.model<PhotoGallery>(
  "PhotoGallery",
  PhotoGallerySchema
);
export default PhotoGalleryModel;
