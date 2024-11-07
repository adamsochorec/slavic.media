import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface Image extends Document {
  id: string;
  alt: string;
  title: string;
  flag: string;
}

interface Gallery extends Document {
  desc: string;
  handle: string;
  title: string;
  column1: Image[];
  column2: Image[];
  column3: Image[];
  column4: Image[];
}

interface ImgInterface extends Document {
  portrait: Gallery;
  outdoor: Gallery;
  still: Gallery;
}

const imageSchema = new Schema({
  id: { type: String, required: true },
  alt: { type: String, required: true },
  title: { type: String, required: true },
  flag: { type: String, required: true },
});

const gallerySchema = new Schema({
  desc: { type: String, required: true },
  handle: { type: String, required: true },
  title: { type: String, required: true },
  column1: [imageSchema],
  column2: [imageSchema],
  column3: [imageSchema],
  column4: [imageSchema],
});

const imgSchema = new Schema({
  portrait: { type: gallerySchema, required: true },
  outdoor: { type: gallerySchema, required: true },
  still: { type: gallerySchema, required: true },
});

// Create a Model
const imgModel = mongoose.model<ImgInterface>("img", imgSchema);
export default imgModel;
