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
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  url: { type: String, required: true, maxlength: 100 },
  year: { type: String, required: true, maxlength: 4 },
  client: { type: String, maxlength: 100 },
});

const articleSchema: Schema = new Schema({
  _id: { type: String, required: true, maxlength: 100 },
  title: { type: String, required: true, maxlength: 200 },
  author: { type: String, ref: "Employee", required: true },
  metadata: {
    date: { type: Date, required: true },
    formatedDate: { type: String, required: true, maxlength: 50 },
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
