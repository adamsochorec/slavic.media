import { date } from "joi";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

interface img extends Document {
  author: {
    thumbnail: string;
    name: string;
    url: string;
  };
  metadata: {
    date: string;
    keywords: string[];
    linkedin: string;
    thumbnail: string;
    length: number;
  };
  content: string[];
  title: string;
  slug: string;
}

const articleSchema: Schema = new Schema({
  author: {
    thumbnail: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  metadata: {
    date: { type: String, required: true },
    keywords: { type: [String], required: true },
    linkedin: { type: String, required: false },
    thumbnail: { type: String, required: true },
    length: { type: Number, required: true },
  },
  content: { type: [String], required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});
// Middleware to generate slug before saving
articleSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

const article = mongoose.model<img>("Article", articleSchema);
export default article;
