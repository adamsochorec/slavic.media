// Import the mongoose module to interact with MongoDB
import { date } from "joi";
import mongoose, { Schema } from "mongoose";

// Import the 'os' module to use its 'type' function
import { type } from "os";

// Interface representing a document in MongoDB.
interface IArticle extends Document {
  author: {
    thumbnail: string;
    name: string;
    url: string;
  };
  metadata: {
    date: string;
    keywords: string[];
    linkedin: string;
    facebook: string;
    thumbnail: string;
    lenght: number;
  };
  content: {
    text: string[];
    img: string[];
  };
  title: string;
}

// Schema corresponding to the document interface.
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
    facebook: { type: String, required: false },
    thumbnail: { type: String, required: true },
    lenght: { type: Number, required: true },
  },
  content: {
    text: { type: [String], required: true },
    img: { type: [String], required: true },
  },
  title: { type: String, required: true },
});

// Create a Model
const Article = mongoose.model<IArticle>("Article", articleSchema);
export default Article;
