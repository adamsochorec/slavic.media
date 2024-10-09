import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IImg extends Document {
  photo: {
    largeURL: string;
    thumbnailURL: string;
    width: number;
    height: number;
    flag: string;
    title: string;
    alt: string;
    keywords: string[];
  };
}

const photoSchema = new Schema({
  largeURL: { type: String, required: true },
  thumbnailURL: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  flag: { type: String, required: true },
  title: { type: String, required: true },
  alt: { type: String, required: true },
  keywords: { type: [String], required: true },
});

// Create a Model
const ImgModel = mongoose.model<IImg>("Photo", photoSchema);
export default ImgModel;
