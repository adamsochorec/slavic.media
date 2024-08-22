// Import the mongoose module to interact with MongoDB
import mongoose, { Schema } from "mongoose";

// Import the 'os' module to use its 'type' function
import { type } from "os";

// Interface representing a document in MongoDB.
interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  date: number;
  thumnail: string;
}

// Schema corresponding to the document interface.
const articleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

// Create a Model
const Article = mongoose.model<IArticle>("Article", articleSchema);
export default Article;
