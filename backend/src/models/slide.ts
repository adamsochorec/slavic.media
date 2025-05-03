import mongoose, { Schema, Document } from "mongoose";

export interface Slide extends Document {
  _id: string;
  log: string;
}

export const SlideSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  log: { type: String, required: true, maxlength: 50 },
});

const SlideModel = mongoose.model<Slide>("Slide", SlideSchema);
export default SlideModel;
