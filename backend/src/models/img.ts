import mongoose, { Schema, Document } from "mongoose";

export interface image extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

export const imageSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 2 },
});

const imageModel = mongoose.model<image>("image", imageSchema);
export default imageModel;
