import mongoose, { Schema, Document } from "mongoose";

export interface reel extends Document {
  id: string;
  platform: string;
  url: string;
  flag?: string;
}

export const reelSchema = new Schema({
  _id: { type: String, required: true, maxlength: 100 },
  platform: { type: String, required: true, maxlength: 20 },
  flag: { type: String, required: false, maxlength: 2 },
  url: { type: String, required: true, maxlength: 200 },
});

const reelModel = mongoose.model<reel>("reel", reelSchema);
export default reelModel;
