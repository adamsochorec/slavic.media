import mongoose, { Schema, Document } from "mongoose";

export interface Reel extends Document {
  _id: string;
  platform: string;
  url: string;
  flag?: string;
}

export const ReelSchema = new Schema({
  _id: { type: String, required: true, maxlength: 100 },
  platform: { type: String, required: true, maxlength: 20 },
  flag: { type: String, required: false, maxlength: 2 },
  url: { type: String, required: true, maxlength: 200 },
});

const ReelModel = mongoose.model<Reel>("Reel", ReelSchema);
export default ReelModel;
