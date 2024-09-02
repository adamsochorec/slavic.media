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
  };
  metadata: {
    date: string;
    keywords: string[];
    thumbnail: string;
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
  },
  metadata: {
    date: { type: String, required: true },
    keywords: { type: [String], required: true },
    thumbnail: { type: String, required: true },
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
