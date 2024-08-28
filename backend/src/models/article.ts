// Import the mongoose module to interact with MongoDB
import { date } from "joi";
import mongoose, { Schema } from "mongoose";

// Import the 'os' module to use its 'type' function
import { type } from "os";

// Interface representing a document in MongoDB.
interface IArticle extends Document {
  author: string;
  authorThumbnail: string;
  content: string;
  date: String;
  keywords: string[];
  thumbnail: string;
  title: string;
}

// Schema corresponding to the document interface.
const articleSchema: Schema = new Schema({
  author: { type: String, required: true },
  authorThumbnail: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  keywords: { type: [String], required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
});

// Create a Model
const Article = mongoose.model<IArticle>("Article", articleSchema);
export default Article;
