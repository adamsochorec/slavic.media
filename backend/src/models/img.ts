import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface imgInterface extends Document {
  _id: string;
  alt: string;
  title: number;
  flag: number;
}

const imgSchema = new Schema({
  _id: { type: String, required: true },
  flag: { type: String, required: true },
  title: { type: String, required: true },
  alt: { type: String, required: true },
});

// Create a Model
const imgModel = mongoose.model<imgInterface>("img", imgSchema);
export default imgModel;
