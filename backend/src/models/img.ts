import mongoose, { Schema, Document } from "mongoose";

export interface Img extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

export const ImgSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 2 },
});

const ImgModel = mongoose.model<Img>("img", ImgSchema);
export default ImgModel;
