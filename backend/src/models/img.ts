import mongoose, { Schema, Document } from "mongoose";

export interface img extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

export const imgSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 2 },
});

const imgModel = mongoose.model<img>("img", imgSchema);
export default imgModel;
