import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface imgInterface extends Document {
  img: {
    id: string;
    largeURL: string;
    thumbnailURL: string;
    width: number;
    height: number;
    flag: string;
    title: string;
    alt: string;
    client: string;
  };
}
const imgSchema = new Schema({
  string: { type: String, required: true },
  largeURL: { type: String, required: true },
  thumbnailURL: { type: String, required: false },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  flag: { type: String, required: false },
  title: { type: String, required: true },
  alt: { type: String, required: true },
  client: { type: String, required: true },
});

// Create a Model
const imgModel = mongoose.model<imgInterface>("img", imgSchema);
export default imgModel;
