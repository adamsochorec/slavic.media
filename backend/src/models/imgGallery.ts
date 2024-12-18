import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface Gallery extends Document {
  _id: string;
  index: number;
  desc: string;
  title: string;
  type: string;
  columns: ObjectId[][];
}

const gallerySchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true },
  desc: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, maxlength: 200 },
  type: { type: String, required: true },
  columns: {
    type: [[{ type: Schema.Types.ObjectId, ref: "Img" }]],
    required: true,
  },
});

const Gallery = mongoose.model<Gallery>("Gallery", gallerySchema);
export default Gallery;
