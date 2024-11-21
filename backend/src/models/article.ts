import { date } from "joi";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

interface article extends Document {
  author: {
    thumbnail: string;
    name: string;
    url: string;
  };
  metadata: {
    date: Date;
    formatedDate: string;
    keywords: string[];
    linkedin: string;
    thumbnail: string;
    length: number;
  };
  _id: string;
  content: string[];
  title: string;
}

const articleSchema: Schema = new Schema({
  _id: { type: String, required: true },
  author: {
    thumbnail: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  metadata: {
    date: { type: Date, required: true },
    formatedDate: { type: String, required: true },
    keywords: { type: [String], required: true },
    linkedin: { type: String, required: false },
    thumbnail: { type: String, required: true },
    length: { type: Number, required: true },
  },
  content: { type: [String], required: true },
  title: { type: String, required: true },
});

const article = mongoose.model<article>("Article", articleSchema);
export default article;
