import { required } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface video extends Document {
  _id: string;
  index: number;
  img: string;
  flag: string;
  title: string;
  year: Date;
  client: string;
}
interface videoGallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  videos: video[];
}
const videoSchema = new Schema({
  _id: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
  img: { type: String, required: false },
  flag: { type: String, required: true },
  title: { type: String, required: false },
  year: { type: String, required: true },
  client: { type: String, required: false },
});

const videoGallerySchema = new Schema({
  _id: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true },
  title: { type: String, required: true },
  videos: { type: [videoSchema], required: true },
});

const videoGallery = mongoose.model<video>("Video Gallery", videoGallerySchema);
export default videoGallery;
