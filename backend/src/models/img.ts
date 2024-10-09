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
    category: string;
    column: number;
    client: string;
  };
}
const photoSchema = new Schema({
  largeURL: { type: String, required: true },
  thumbnailURL: { type: String, required: false },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  flag: { type: String, required: false },
  title: { type: String, required: true },
  alt: { type: String, required: true },
  category: { type: String, required: true },
  column: { type: Number, required: false },
  client: { type: String, required: true },
});

// Create a Model
const ImgModel = mongoose.model<IImg>("Photo", photoSchema);
export default ImgModel;
