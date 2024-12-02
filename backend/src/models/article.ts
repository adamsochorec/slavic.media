import mongoose, { Schema, Document } from "mongoose";

interface video extends Document {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: Date;
  client: string;
}

interface article extends Document {
  _id: string;
  title: string;
  author: string;
  metadata: {
    date: Date;
    formatedDate: string;
    keywords: string[];
    linkedin: string;
    thumbnail: string;
    icon: string;
    desc: string;
    length: number;
  };
  content: string[];
  videos: video[];
}

const videoSchema = new Schema({
  _id: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  year: { type: String, required: true },
  client: { type: String, required: false },
});

const articleSchema: Schema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, ref: "Employee", required: true },
  metadata: {
    date: { type: Date, required: true },
    formatedDate: { type: String, required: true },
    keywords: { type: [String], required: true },
    linkedin: { type: String, required: false },
    thumbnail: { type: String, required: true },
    icon: { type: String, required: true },
    desc: { type: String, required: true },
    length: { type: Number, required: true },
  },
  content: { type: [String], required: true },
  videos: { type: [videoSchema], required: false },
});

const articleModel = mongoose.model<article>("Article", articleSchema);
export default articleModel;
