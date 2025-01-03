import mongoose, { Schema, Document } from "mongoose";

interface video extends Document {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: string;
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
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  url: { type: String, required: true, maxlength: 100 },
  year: { type: String, required: true, maxlength: 4 },
  client: { type: String, maxlength: 100 },
});

const videoGallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  videos: { type: [videoSchema], required: true },
});

const videoGallery = mongoose.model<videoGallery>(
  "VideoGallery",
  videoGallerySchema
);
export { videoSchema };
export default videoGallery;
