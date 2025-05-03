import mongoose, { Schema, Document } from "mongoose";

export interface slide extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

export const slideSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  log: { type: String, required: true, maxlength: 50 },
});

const slideModel = mongoose.model<slide>("slide", slideSchema);
export default slideModel;
