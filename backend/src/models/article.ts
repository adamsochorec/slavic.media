import mongoose, { Schema, Document } from "mongoose";
import { videoSchema } from "./video";

interface article extends Document {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    department: string;
    linkedin: string;
  };
  metadata: {
    date: Date;
    flag: string;
    keywords: string[];
    linkedin: string;
    thumbnail: string;
    icon: string;
    desc: string;
    length: number;
  };
  content: string[];
  videos: mongoose.Types.DocumentArray<mongoose.Document>;
}

const articleSchema: Schema = new Schema({
  _id: { type: String, required: true, maxlength: 100 },
  title: { type: String, required: true, maxlength: 200 },
  author: { type: String, ref: "Employee", required: true },
  metadata: {
    date: { type: Date, required: true },
    flag: { type: String, required: false, maxlength: 2 },
    keywords: { type: [String], required: true },
    linkedin: { type: String, maxlength: 200 },
    thumbnail: { type: String, required: true, maxlength: 100 },
    icon: { type: String, required: true, maxlength: 50 },
    desc: { type: String, required: true, maxlength: 1000 },
    length: { type: Number, required: true, min: 1 },
  },
  content: { type: [String], required: true },
  videos: { type: [videoSchema], required: false },
});

const articleModel = mongoose.model<article>("Article", articleSchema);
export default articleModel;
