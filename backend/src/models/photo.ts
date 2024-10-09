import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface IPhoto extends Document {
  photo: {
    largeURL: string;
    thumbnailURL: string;
    width: number;
    height: number;
    flag: string;
    title: string;
    alt: string;
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
});

// Create a Model
const PhotoModel = mongoose.model<IPhoto>("Photo", photoSchema);
export default PhotoModel;
