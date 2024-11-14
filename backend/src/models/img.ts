import mongoose, { Schema, Document } from "mongoose";

// Interface representing an img document in MongoDB.
interface img extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

// Interface representing a gallery document in MongoDB.
interface gallery extends Document {
  _id: string;
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

const gallerySchema = new Schema({
  _id: { type: String, required: true },
  desc: { type: String, required: true },
  title: { type: String, required: true },
  columns: { type: [[imgSchema]], required: true },
});

const gallery = mongoose.model<gallery>("Gallery", gallerySchema);
export default gallery;
