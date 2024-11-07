import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
interface Image extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

interface Gallery extends Document {
  _id: string;
  desc: string;
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
  _id: { type: String, required: true },
  alt: { type: String, required: true },
  title: { type: String, required: true },
  flag: { type: String, required: true },
});
const gallerySchema = new Schema({
  _id: { type: String, required: true },
  desc: { type: String, required: true },
  title: { type: String, required: true },
  column1: { type: [imageSchema], required: true },
  column2: { type: [imageSchema], required: true },
  column3: { type: [imageSchema], required: true },
  column4: { type: [imageSchema], required: true },
});
const imgSchema = new Schema({
  portrait: { type: gallerySchema, required: true },
  outdoor: { type: gallerySchema, required: true },
  still: { type: gallerySchema, required: true },
});
// Create a Model
const imgModel = mongoose.model<ImgInterface>("img", imgSchema);
export default imgModel;
